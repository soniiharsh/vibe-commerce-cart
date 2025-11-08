import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCart, addToCart, removeFromCart, updateCartQty, checkout } from './api';
import Products from './Products';
import Cart from './Cart';
import CheckoutModal from './CheckoutModal';
import './index.css';

function App(){
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  async function loadAll(){
    setLoading(true);
    const p = await fetchProducts();
    const c = await fetchCart();
    setProducts(p);
    setCart(c);
    setLoading(false);
  }
  useEffect(()=> { loadAll(); }, []);

  async function handleAdd(productId){
    await addToCart(productId, 1);
    const c = await fetchCart();
    setCart(c);
  }
  async function handleRemove(cartId){
    await removeFromCart(cartId);
    const c = await fetchCart();
    setCart(c);
  }
  async function handleUpdate(cartId, qty){
    await updateCartQty(cartId, qty);
    const c = await fetchCart();
    setCart(c);
  }
  async function handleCheckout(form){
    const res = await checkout(form.name, form.email);
    if (res.receipt) {
      setReceipt(res.receipt);
      setShowCheckout(false);
      setCart({ items: [], total: 0 });
    } else {
      alert(res.error || 'Checkout failed');
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Vibe Commerce — Mock Cart</h1>
        <button className="cart-btn" onClick={()=> setShowCheckout(true)}>Checkout</button>
      </header>

      {loading ? <p>Loading...</p> : (
        <>
          <Products products={products} onAdd={handleAdd} />
          <Cart items={cart.items || []} total={cart.total || 0} onRemove={handleRemove} onUpdate={handleUpdate} />
        </>
      )}

      <CheckoutModal visible={showCheckout} onClose={()=> setShowCheckout(false)} onSubmit={handleCheckout} />

      {receipt && (
        <div className="receipt">
          <h3>Receipt</h3>
          <p><strong>Total:</strong> ₹{receipt.total.toFixed(2)}</p>
          <p><strong>Time:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
          <button onClick={()=> setReceipt(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
