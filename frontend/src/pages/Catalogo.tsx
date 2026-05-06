import React, { useState } from 'react';
import { BarraNavegacionSuperior } from '../components/ui/BarraNavegacionSuperior';
import { TarjetaProducto } from '../components/ui/TarjetaProducto';
import { Footer } from '../components/ui/Footer';
import { Paginacion } from '../components/ui/Paginacion';
import { tokens } from '../styles/tokens';
import { useProducts } from '../hooks/useProducts';

export function Catalogo() {
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const { products, loading, total } = useProducts({ category, page });

  const categories = ['food', 'toys', 'accessories', 'grooming', 'beds', 'other'];

  return (
    <div style={{ fontFamily: tokens.typography.font_family, backgroundColor: tokens.colors.background, minHeight: '100vh' }}>
      <BarraNavegacionSuperior user={null} cartCount={0} onSearch={() => {}} />
      <main style={{ padding: tokens.spacing.lg }}>
        <h1 style={{ font: tokens.typography.headings.h1, color: tokens.colors.text_primary, marginBottom: tokens.spacing.lg }}>
          Catálogo
        </h1>
        <div style={{ display: 'flex', gap: tokens.spacing.sm, marginBottom: tokens.spacing.xl, flexWrap: 'wrap' }}>
          <button
            onClick={() => setCategory('')}
            style={{
              padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
              borderRadius: tokens.radii.md,
              border: '1px solid',
              borderColor: !category ? tokens.colors.primary : tokens.colors.text_secondary,
              backgroundColor: !category ? tokens.colors.primary : tokens.colors.surface,
              color: !category ? '#fff' : tokens.colors.text_primary,
              cursor: 'pointer',
            }}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                borderRadius: tokens.radii.md,
                border: '1px solid',
                borderColor: category === cat ? tokens.colors.primary : tokens.colors.text_secondary,
                backgroundColor: category === cat ? tokens.colors.primary : tokens.colors.surface,
                color: category === cat ? '#fff' : tokens.colors.text_primary,
                cursor: 'pointer',
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
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: tokens.spacing.lg }}>
              {products.map(product => (
                <TarjetaProducto key={product.id} product={product} onClick={() => window.location.href = `/producto/${product.id}`} />
              ))}
            </div>
            <div style={{ marginTop: tokens.spacing.xl, display: 'flex', justifyContent: 'center' }}>
              <Paginacion page={page} total={total} pageSize={10} onPageChange={setPage} />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
