import React from 'react';
import { tokens } from '../../styles/tokens';

interface BotonPrimarioProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
}

export function BotonPrimario({ children, onClick, disabled, loading, type = 'button' }: BotonPrimarioProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
        backgroundColor: disabled ? tokens.colors.text_secondary : tokens.colors.primary,
        color: '#fff',
        border: 'none',
        borderRadius: tokens.radii.md,
        font: tokens.typography.button,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: tokens.motion_interaction,
        boxShadow: tokens.shadows.button,
      }}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
}
