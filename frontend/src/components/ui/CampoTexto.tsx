import React from 'react';
import { tokens } from '../../styles/tokens';

interface CampoTextoProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function CampoTexto({ label, value, onChange, type = 'text', placeholder, error, required }: CampoTextoProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
      <label style={{ font: tokens.typography.body.small, color: tokens.colors.text_primary }}>
        {label} {required && '*'}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          padding: tokens.spacing.md,
          borderRadius: tokens.radii.md,
          border: `1px solid ${error ? tokens.colors.error : tokens.colors.text_secondary}`,
          font: tokens.typography.body.regular,
          backgroundColor: tokens.colors.surface,
          color: tokens.colors.text_primary,
        }}
      />
      {error && <span style={{ fontSize: '12px', color: tokens.colors.error }}>{error}</span>}
    </div>
  );
}
