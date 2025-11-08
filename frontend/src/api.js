const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function fetchProducts() {
  const res = await fetch(`${BASE}/products`);
  return res.json();
}
export async function fetchCart() {
  const res = await fetch(`${BASE}/cart`);
  return res.json();
}
export async function addToCart(productId, qty=1) {
  const res = await fetch(`${BASE}/cart`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ productId, qty })
  });
  return res.json();
}
export async function removeFromCart(cartId) {
  const res = await fetch(`${BASE}/cart/${cartId}`, { method: 'DELETE' });
  return res.json();
}
export async function updateCartQty(cartId, qty) {
  const res = await fetch(`${BASE}/cart/${cartId}`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ qty })
  });
  return res.json();
}
export async function checkout(name,email) {
  const res = await fetch(`${BASE}/checkout`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ name, email })
  });
  return res.json();
}
