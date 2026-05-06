import React from 'react';
import { tokens } from '../../styles/tokens';

interface BotonSecundarioProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
}

export function BotonSecundario({ children, onClick, disabled, loading, type = 'button' }: BotonSecundarioProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
        backgroundColor: tokens.colors.surface,
        color: tokens.colors.primary,
        border: `2px solid ${tokens.colors.primary}`,
        borderRadius: tokens.radii.md,
        font: tokens.typography.button,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: tokens.motion_interaction,
      }}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
}
