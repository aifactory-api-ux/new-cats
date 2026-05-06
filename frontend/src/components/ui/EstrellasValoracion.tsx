import React from 'react';
import { tokens } from '../../styles/tokens';

interface EstrellasValoracionProps {
  value: number;
  max?: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
}

export function EstrellasValoracion({ value, max = 5, onChange, readOnly }: EstrellasValoracionProps) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          onClick={() => !readOnly && onChange && onChange(i + 1)}
          style={{
            cursor: readOnly ? 'default' : 'pointer',
            color: i < value ? tokens.colors.primary : tokens.colors.text_secondary,
            fontSize: '18px',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
