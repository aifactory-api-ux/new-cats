import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarraNavegacionSuperior } from '../components/ui/BarraNavegacionSuperior';
import { Footer } from '../components/ui/Footer';
import { BotonPrimario } from '../components/ui/BotonPrimario';
import { EstrellasValoracion } from '../components/ui/EstrellasValoracion';
import { SelectorCantidad } from '../components/ui/SelectorCantidad';
import { tokens } from '../styles/tokens';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';

export function DetalleProductoMobile() {
  const { id } = useParams<{ id: string }>();
  const { fetchProductById, product } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div style={{ fontFamily: tokens.typography.font_family, backgroundColor: tokens.colors.background, minHeight: '100vh' }}>
      <BarraNavegacionSuperior user={null} cartCount={0} onSearch={() => {}} />
      <main style={{ padding: tokens.spacing.md }}>
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: tokens.radii.md, marginBottom: tokens.spacing.lg }} />
        <h1 style={{ font: tokens.typography.headings.h3, color: tokens.colors.text_primary, marginBottom: tokens.spacing.sm }}>
          {product.name}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm, marginBottom: tokens.spacing.sm }}>
          <EstrellasValoracion value={product.rating} readOnly />
          <span style={{ color: tokens.colors.text_secondary, fontSize: '12px' }}>({product.numReviews})</span>
        </div>
        <p style={{ font: tokens.typography.headings.h4, color: tokens.colors.primary, marginBottom: tokens.spacing.md }}>
          ${product.price.toFixed(2)}
        </p>
        <p style={{ font: tokens.typography.body.small, color: tokens.colors.text_secondary, marginBottom: tokens.spacing.lg }}>
          {product.description}
        </p>
        <SelectorCantidad value={quantity} onChange={setQuantity} min={1} max={product.stock} />
        <div style={{ marginTop: tokens.spacing.md }}>
          <BotonPrimario onClick={() => addToCart({ productId: product.id, quantity })}>
            Añadir al Carrito
          </BotonPrimario>
        </div>
      </main>
      <Footer />
    </div>
  );
}
