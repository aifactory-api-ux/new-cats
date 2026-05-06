import React from 'react';
import { tokens } from '../../styles/tokens';

interface SelectorCantidadProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
}

export function SelectorCantidad({ value, min = 1, max = 99, onChange }: SelectorCantidadProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: tokens.radii.md,
          border: '1px solid',
          borderColor: tokens.colors.text_secondary,
          backgroundColor: tokens.colors.surface,
          color: tokens.colors.text_primary,
          cursor: value <= min ? 'not-allowed' : 'pointer',
          fontSize: '18px',
        }}
      >
        -
      </button>
      <span style={{
        minWidth: '40px',
        textAlign: 'center',
        font: tokens.typography.body.regular,
        color: tokens.colors.text_primary,
      }}>
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: tokens.radii.md,
          border: '1px solid',
          borderColor: tokens.colors.text_secondary,
          backgroundColor: tokens.colors.surface,
          color: tokens.colors.text_primary,
          cursor: value >= max ? 'not-allowed' : 'pointer',
          fontSize: '18px',
        }}
      >
        +
      </button>
    </div>
  );
}
