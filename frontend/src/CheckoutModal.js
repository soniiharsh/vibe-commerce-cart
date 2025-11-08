import React, { useState } from 'react';

export default function CheckoutModal({ visible, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!visible) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Checkout</h3>
        <label>
          Name
          <input value={name} onChange={e=>setName(e.target.value)} />
        </label>
        <label>
          Email
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </label>
        <div style={{display:'flex', gap:10}}>
          <button onClick={()=> { onSubmit({ name, email }); }}>Pay (mock)</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
