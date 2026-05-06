import React from 'react';
import { tokens } from '../../styles/tokens';
import { Product } from '../../utils/api';
import { EstrellasValoracion } from './EstrellasValoracion';

interface TarjetaProductoProps {
  product: Product;
  onClick?: () => void;
}

export function TarjetaProducto({ product, onClick }: TarjetaProductoProps) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: tokens.colors.surface,
        borderRadius: tokens.radii.lg,
        padding: tokens.spacing.md,
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: tokens.shadows.card,
        transition: tokens.motion_interaction,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing.sm,
      }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: '100%',
          aspectRatio: '1/1',
          objectFit: 'cover',
          borderRadius: tokens.radii.md,
        }}
      />
      <h3 style={{
        font: tokens.typography.headings.h4,
        color: tokens.colors.text_primary,
        margin: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {product.name}
      </h3>
      <EstrellasValoracion value={product.rating} readOnly />
      <p style={{
        font: tokens.typography.headings.h4,
        color: tokens.colors.primary,
        margin: 0,
      }}>
        ${product.price.toFixed(2)}
      </p>
    </div>
  );
}
