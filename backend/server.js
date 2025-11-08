const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GET /api/products
app.get('/api/products', async (req,res) => {
  try {
    const products = await db.all('SELECT id, name, price, description FROM products');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/cart -> returns items with product details and total
app.get('/api/cart', async (req,res) => {
  try {
    const items = await db.all(`
      SELECT c.id as cartId, c.productId, c.qty, p.name, p.price
      FROM cart c
      JOIN products p ON p.id = c.productId
    `);
    const total = items.reduce((s,i) => s + i.price * i.qty, 0);
    res.json({ items, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart -> body { productId, qty }
app.post('/api/cart', async (req,res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !Number.isInteger(qty) || qty <= 0) {
      return res.status(400).json({ error: 'Invalid productId or qty' });
    }
    // check if item exists in cart -> update qty
    const existing = await db.get('SELECT id, qty FROM cart WHERE productId = ?', [productId]);
    if (existing) {
      await db.run('UPDATE cart SET qty = ? WHERE id = ?', [existing.qty + qty, existing.id]);
    } else {
      await db.run('INSERT INTO cart (productId, qty) VALUES (?, ?)', [productId, qty]);
    }
    const cart = await db.all('SELECT * FROM cart');
    res.status(201).json({ message: 'Added to cart', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// DELETE /api/cart/:id  (cart item id)
app.delete('/api/cart/:id', async (req,res) => {
  try {
    const id = parseInt(req.params.id);
    await db.run('DELETE FROM cart WHERE id = ?', [id]);
    res.json({ message: 'Removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// PATCH /api/cart/:id -> update qty { qty }
app.patch('/api/cart/:id', async (req,res) => {
  try {
    const id = parseInt(req.params.id);
    const { qty } = req.body;
    if (!Number.isInteger(qty) || qty <= 0) return res.status(400).json({ error: 'Invalid qty' });
    await db.run('UPDATE cart SET qty = ? WHERE id = ?', [qty, id]);
    res.json({ message: 'Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update' });
  }
});

// POST /api/checkout -> { name, email }
app.post('/api/checkout', async (req,res) => {
  try {
    const { name, email } = req.body;
    const items = await db.all(`
      SELECT c.id as cartId, c.productId, c.qty, p.name, p.price
      FROM cart c
      JOIN products p ON p.id = c.productId
    `);
    if (!items.length) return res.status(400).json({ error: 'Cart is empty' });
    const total = items.reduce((s,i) => s + i.price * i.qty, 0);
    const timestamp = new Date().toISOString();

    // create receipt
    const result = await db.run(
      'INSERT INTO receipts (name, email, total, timestamp) VALUES (?, ?, ?, ?)',
      [name || 'Guest', email || '', total, timestamp]
    );
    const receiptId = result.lastID;

    // Optionally persist line items to a receipts_items table (skipped for brevity)
    // Clear cart
    await db.run('DELETE FROM cart');

    res.json({
      receipt: {
        id: receiptId,
        name,
        email,
        total,
        timestamp,
        items
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

// health
app.get('/health', (req,res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Vibe backend running on port ${PORT}`);
});
