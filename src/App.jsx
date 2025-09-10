import React, { useState, useEffect } from 'react';
import axios from './api';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(()=> { axios.get('/products').then(r=> setProducts(r.data)).catch(()=> setProducts([])); },[]);
  return (
    <main style={{padding:20}}>
      <h1>Productos</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        {products.map(p=> (
          <div key={p._id || p.id} style={{border:'1px solid #ddd',padding:12,borderRadius:8}}>
            <img src={p.foto || 'https://via.placeholder.com/200'} alt={p.nombre} style={{width:'100%',height:140,objectFit:'cover'}}/>
            <h3>{p.nombre}</h3>
            <p>{p.descripcionCorta}</p>
            <div><strong>${p.precio}</strong></div>
          </div>
        ))}
      </div>
    </main>
  );
}

function Cart() {
  const [cart] = useState([{ nombre: 'Demo desde frontend', precio: 1000, cantidad:1 }]);
  const handlePay = async () => {
    try {
      const res = await axios.post('/pay', cart);
      if (res.data && res.data.init_point) { window.location.href = res.data.init_point; } else { alert('Error al generar pago'); }
    } catch (err) { alert('Error al llamar al backend de pago'); console.error(err); }
  };
  return (
    <main style={{padding:20}}>
      <h1>Carrito</h1>
      <ul>{cart.map((it,i)=> <li key={i}>{it.nombre} - ${it.precio} x {it.cantidad}</li>)}</ul>
      <button onClick={handlePay}>Pagar con Mercado Pago</button>
      <div style={{marginTop:10}}><Link to="/">Volver</Link></div>
    </main>
  );
}

function Success() { return <main style={{padding:20}}><h1>Pago exitoso</h1><Link to='/'>Volver a Home</Link></main>; }
function Failure() { return <main style={{padding:20}}><h1>Pago cancelado</h1><Link to='/'>Volver a Home</Link></main>; }

export default function App(){ return (<BrowserRouter><nav style={{padding:10,background:'#f5f5f5'}}><Link to='/'>Home</Link> | <Link to='/cart'>Carrito</Link></nav><Routes><Route path='/' element={<Home/>}/><Route path='/cart' element={<Cart/>}/><Route path='/success' element={<Success/>}/><Route path='/failure' element={<Failure/>}/></Routes></BrowserRouter>); }
