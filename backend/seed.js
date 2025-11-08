const db = require('./db');

async function seed() {
  try {
    await db.run('DELETE FROM products');
    const products = [
      ['Vibe T-shirt', 299.00, 'Comfort cotton tee'],
      ['Vibe Sneakers', 1999.00, 'Lightweight running shoes'],
      ['Vibe Hoodie', 899.00, 'Warm hoodie for evenings'],
      ['Vibe Cap', 199.00, 'Classic baseball cap'],
      ['Vibe Mug', 149.00, 'Ceramic coffee mug'],
      ['Vibe Backpack', 1499.00, '15L daily backpack'],
      ['Vibe Sunglasses', 499.00, 'UV protected']
    ];
    for (const p of products) {
      await db.run('INSERT INTO products (name, price, description) VALUES (?, ?, ?)', p);
    }
    console.log('Seeded products');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed', err);
    process.exit(1);
  }
}
seed();
