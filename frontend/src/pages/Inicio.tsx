import React from 'react';
import { BarraNavegacionSuperior } from '../components/ui/BarraNavegacionSuperior';
import { TarjetaProducto } from '../components/ui/TarjetaProducto';
import { Footer } from '../components/ui/Footer';
import { BotonPrimario } from '../components/ui/BotonPrimario';
import { tokens } from '../styles/tokens';
import { useProducts } from '../hooks/useProducts';

export function Inicio() {
  const { products } = useProducts();

  return (
    <div style={{ fontFamily: tokens.typography.font_family, backgroundColor: tokens.colors.background, minHeight: '100vh' }}>
      <BarraNavegacionSuperior user={null} cartCount={0} onSearch={() => {}} />
      <main style={{ padding: tokens.spacing.lg }}>
        <section style={{ textAlign: 'center', marginBottom: tokens.spacing.xxl }}>
          <h1 style={{ font: tokens.typography.headings.h1, color: tokens.colors.text_primary, marginBottom: tokens.spacing.md }}>
            Bienvenido a New Cats
          </h1>
          <p style={{ font: tokens.typography.body.regular, color: tokens.colors.text_secondary }}>
            Los mejores productos para tu gato
          </p>
          <div style={{ marginTop: tokens.spacing.lg }}>
            <BotonPrimario onClick={() => window.location.href = '/catalogo'}>
              Ver Catálogo
            </BotonPrimario>
          </div>
        </section>
        <section>
          <h2 style={{ font: tokens.typography.headings.h2, color: tokens.colors.text_primary, marginBottom: tokens.spacing.lg }}>
            Productos Destacados
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: tokens.spacing.lg }}>
            {products.slice(0, 4).map(product => (
              <TarjetaProducto key={product.id} product={product} onClick={() => window.location.href = `/producto/${product.id}`} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
