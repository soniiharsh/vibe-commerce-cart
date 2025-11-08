import React from 'react';

export default function Cart({ items, total, onRemove, onUpdate }) {
  return (
    <aside className="cart">
      <h2>Cart</h2>
      {items.length === 0 ? <p>Cart empty</p> : (
        <>
          <ul>
            {items.map(it => (
              <li key={it.cartId} className="cart-item">
                <div>
                  <strong>{it.name}</strong>
                  <div>₹{it.price.toFixed(2)} × 
                    <input type="number" min="1" value={it.qty}
                      onChange={(e)=> onUpdate(it.cartId, parseInt(e.target.value || '1'))} style={{width:60, marginLeft:6}} />
                  </div>
                </div>
                <div>
                  <p>₹{(it.qty*it.price).toFixed(2)}</p>
                  <button onClick={()=> onRemove(it.cartId)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <hr />
          <div className="cart-total">
            <strong>Total: ₹{total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </aside>
  );
}
