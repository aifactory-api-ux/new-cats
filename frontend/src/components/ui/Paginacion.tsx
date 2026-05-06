import React from 'react';
import { tokens } from '../../styles/tokens';

interface PaginacionProps {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (p: number) => void;
}

export function Paginacion({ page, total, pageSize, onPageChange }: PaginacionProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div style={{ display: 'flex', gap: tokens.spacing.sm, alignItems: 'center' }}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        style={{
          padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
          borderRadius: tokens.radii.md,
          border: '1px solid',
          borderColor: tokens.colors.text_secondary,
          backgroundColor: tokens.colors.surface,
          cursor: page <= 1 ? 'not-allowed' : 'pointer',
          color: tokens.colors.text_primary,
        }}
      >
        Anterior
      </button>
      <span style={{ color: tokens.colors.text_primary }}>
        Página {page} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        style={{
          padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
          borderRadius: tokens.radii.md,
          border: '1px solid',
          borderColor: tokens.colors.text_secondary,
          backgroundColor: tokens.colors.surface,
          cursor: page >= totalPages ? 'not-allowed' : 'pointer',
          color: tokens.colors.text_primary,
        }}
      >
        Siguiente
      </button>
    </div>
  );
}
