import React from 'react';
export default function Products({ products, onAdd }) {
  return (
    <section className="products-grid">
      {products.map(p => (
        <div className="card" key={p.id}>
          <h3>{p.name}</h3>
          <p className="desc">{p.description}</p>
          <p className="price">₹{p.price.toFixed(2)}</p>
          <button onClick={()=> onAdd(p.id)}>Add to cart</button>
        </div>
      ))}
    </section>
  );
}
