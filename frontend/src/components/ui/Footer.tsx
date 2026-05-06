import React from 'react';
import { tokens } from '../../styles/tokens';

export function Footer() {
  return (
    <footer style={{
      padding: tokens.spacing.lg,
      backgroundColor: tokens.colors.text_primary,
      color: '#fff',
      textAlign: 'center',
      marginTop: tokens.spacing.xxl,
    }}>
      <p style={{ font: tokens.typography.body.small, margin: 0 }}>
        © 2026 New Cats. Todos los derechos reservados.
      </p>
    </footer>
  );
}
