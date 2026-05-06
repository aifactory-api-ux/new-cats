import React, { useState } from 'react';
import { BarraNavegacionSuperior } from '../components/ui/BarraNavegacionSuperior';
import { TarjetaProducto } from '../components/ui/TarjetaProducto';
import { Footer } from '../components/ui/Footer';
import { tokens } from '../styles/tokens';
import { useProducts } from '../hooks/useProducts';

export function CatalogoMobile() {
  const [category, setCategory] = useState('');
  const { products, loading } = useProducts({ category });

  const categories = ['food', 'toys', 'accessories', 'grooming', 'beds', 'other'];

  return (
    <div style={{ fontFamily: tokens.typography.font_family, backgroundColor: tokens.colors.background, minHeight: '100vh' }}>
      <BarraNavegacionSuperior user={null} cartCount={0} onSearch={() => {}} />
      <main style={{ padding: tokens.spacing.md }}>
        <h1 style={{ font: tokens.typography.headings.h3, color: tokens.colors.text_primary, marginBottom: tokens.spacing.lg }}>
          Catálogo
        </h1>
        <div style={{ display: 'flex', gap: tokens.spacing.xs, marginBottom: tokens.spacing.lg, overflowX: 'auto', paddingBottom: tokens.spacing.sm }}>
          <button
            onClick={() => setCategory('')}
            style={{
              padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
              borderRadius: tokens.radii.sm,
              border: '1px solid',
              borderColor: !category ? tokens.colors.primary : tokens.colors.text_secondary,
              backgroundColor: !category ? tokens.colors.primary : tokens.colors.surface,
              color: !category ? '#fff' : tokens.colors.text_primary,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
                borderRadius: tokens.radii.sm,
                border: '1px solid',
                borderColor: category === cat ? tokens.colors.primary : tokens.colors.text_secondary,
                backgroundColor: category === cat ? tokens.colors.primary : tokens.colors.surface,
                color: category === cat ? '#fff' : tokens.colors.text_primary,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                textTransform: 'capitalize',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div style={{ display: 'grid', gap: tokens.spacing.md }}>
            {products.map(product => (
              <TarjetaProducto key={product.id} product={product} onClick={() => window.location.href = `/mobile/producto/${product.id}`} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
