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
import { useReviews } from '../hooks/useReviews';

export function DetalleProducto() {
  const { id } = useParams<{ id: string }>();
  const { fetchProductById, product } = useProducts();
  const { addToCart } = useCart();
  const { reviews, addReview } = useReviews(id || '');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div style={{ fontFamily: tokens.typography.font_family, backgroundColor: tokens.colors.background, minHeight: '100vh' }}>
      <BarraNavegacionSuperior user={null} cartCount={0} onSearch={() => {}} />
      <main style={{ padding: tokens.spacing.lg, maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.xxl }}>
          <div>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: tokens.radii.lg }} />
          </div>
          <div>
            <h1 style={{ font: tokens.typography.headings.h1, color: tokens.colors.text_primary, marginBottom: tokens.spacing.md }}>
              {product.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md, marginBottom: tokens.spacing.md }}>
              <EstrellasValoracion value={product.rating} readOnly />
              <span style={{ color: tokens.colors.text_secondary }}>({product.numReviews} reseñas)</span>
            </div>
            <p style={{ font: tokens.typography.headings.h2, color: tokens.colors.primary, marginBottom: tokens.spacing.lg }}>
              ${product.price.toFixed(2)}
            </p>
            <p style={{ font: tokens.typography.body.regular, color: tokens.colors.text_secondary, marginBottom: tokens.spacing.lg }}>
              {product.description}
            </p>
            <div style={{ marginBottom: tokens.spacing.lg }}>
              <SelectorCantidad value={quantity} onChange={setQuantity} min={1} max={product.stock} />
            </div>
            <BotonPrimario onClick={() => addToCart({ productId: product.id, quantity })}>
              Añadir al Carrito
            </BotonPrimario>
          </div>
        </div>
        <section style={{ marginTop: tokens.spacing.xxl }}>
          <h2 style={{ font: tokens.typography.headings.h2, color: tokens.colors.text_primary, marginBottom: tokens.spacing.lg }}>
            Reseñas
          </h2>
          {reviews.length === 0 ? (
            <p style={{ color: tokens.colors.text_secondary }}>No hay reseñas todavía.</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} style={{ borderBottom: '1px solid', borderColor: tokens.colors.text_secondary, padding: tokens.spacing.md, marginBottom: tokens.spacing.md }}>
                <EstrellasValoracion value={review.rating} readOnly />
                <p style={{ color: tokens.colors.text_primary }}>{review.comment}</p>
              </div>
            ))
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
