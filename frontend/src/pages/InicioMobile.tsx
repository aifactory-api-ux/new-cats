import React from 'react';
import { BarraNavegacionSuperior } from '../components/ui/BarraNavegacionSuperior';
import { TarjetaProducto } from '../components/ui/TarjetaProducto';
import { Footer } from '../components/ui/Footer';
import { BotonPrimario } from '../components/ui/BotonPrimario';
import { tokens } from '../styles/tokens';
import { useProducts } from '../hooks/useProducts';

export function InicioMobile() {
  const { products } = useProducts();

  return (
    <div style={{ fontFamily: tokens.typography.font_family, backgroundColor: tokens.colors.background, minHeight: '100vh' }}>
      <BarraNavegacionSuperior user={null} cartCount={0} onSearch={() => {}} />
      <main style={{ padding: tokens.spacing.md }}>
        <section style={{ textAlign: 'center', marginBottom: tokens.spacing.xl }}>
          <h1 style={{ font: tokens.typography.headings.h3, color: tokens.colors.text_primary, marginBottom: tokens.spacing.sm }}>
            New Cats
          </h1>
          <p style={{ font: tokens.typography.body.small, color: tokens.colors.text_secondary }}>
            Los mejores productos para tu gato
          </p>
          <div style={{ marginTop: tokens.spacing.md }}>
            <BotonPrimario onClick={() => window.location.href = '/mobile/catalogo'}>
              Ver Catálogo
            </BotonPrimario>
          </div>
        </section>
        <section>
          <h2 style={{ font: tokens.typography.headings.h4, color: tokens.colors.text_primary, marginBottom: tokens.spacing.md }}>
            Destacados
          </h2>
          <div style={{ display: 'grid', gap: tokens.spacing.md }}>
            {products.slice(0, 3).map(product => (
              <TarjetaProducto key={product.id} product={product} onClick={() => window.location.href = `/mobile/producto/${product.id}`} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
