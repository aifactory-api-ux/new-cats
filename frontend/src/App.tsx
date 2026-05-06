import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Inicio } from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import { DetalleProducto } from './pages/DetalleProducto';
import { Carrito } from './pages/Carrito';
import { Pago } from './pages/Pago';
import { MiCuenta } from './pages/MiCuenta';
import { InicioMobile } from './pages/InicioMobile';
import { CatalogoMobile } from './pages/CatalogoMobile';
import { DetalleProductoMobile } from './pages/DetalleProductoMobile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/cuenta" element={<MiCuenta />} />
        <Route path="/mobile" element={<InicioMobile />} />
        <Route path="/mobile/catalogo" element={<CatalogoMobile />} />
        <Route path="/mobile/producto/:id" element={<DetalleProductoMobile />} />
      </Routes>
    </BrowserRouter>
  );
}
