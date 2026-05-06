import React from 'react';
import { tokens } from '../../styles/tokens';
import { User } from '../../utils/api';

interface BarraNavegacionSuperiorProps {
  user: User | null;
  cartCount: number;
  onSearch: (q: string) => void;
}

export function BarraNavegacionSuperior({ user, cartCount, onSearch }: BarraNavegacionSuperiorProps) {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: tokens.spacing.md,
      backgroundColor: tokens.colors.primary,
      color: '#fff',
      boxShadow: tokens.shadows.card,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.lg }}>
        <a href="/" style={{ textDecoration: 'none', color: '#fff', font: tokens.typography.headings.h3 }}>
          🐱 New Cats
        </a>
        <a href="/catalogo" style={{ textDecoration: 'none', color: '#fff' }}>Catálogo</a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
        <input
          type="search"
          placeholder="Buscar..."
          onChange={e => onSearch(e.target.value)}
          style={{
            padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
            borderRadius: tokens.radii.full,
            border: 'none',
            outline: 'none',
          }}
        />
        <a href="/carrito" style={{ position: 'relative', textDecoration: 'none', color: '#fff' }}>
          🛒 Carrito
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: tokens.colors.accent,
              color: '#fff',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px',
            }}>
              {cartCount}
            </span>
          )}
        </a>
        <a href="/cuenta" style={{ textDecoration: 'none', color: '#fff' }}>
          {user ? user.name : 'Mi Cuenta'}
        </a>
      </div>
    </nav>
  );
}
