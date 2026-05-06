import React from 'react';
import { BarraNavegacionSuperior } from '../components/ui/BarraNavegacionSuperior';
import { Footer } from '../components/ui/Footer';
import { BotonPrimario } from '../components/ui/BotonPrimario';
import { tokens } from '../styles/tokens';

export function Pago() {
  return (
    <div style={{ fontFamily: tokens.typography.font_family, backgroundColor: tokens.colors.background, minHeight: '100vh' }}>
      <BarraNavegacionSuperior user={null} cartCount={0} onSearch={() => {}} />
      <main style={{ padding: tokens.spacing.lg, maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ font: tokens.typography.headings.h1, color: tokens.colors.text_primary, marginBottom: tokens.spacing.xl }}>
          Pago
        </h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.lg }}>
          <div>
            <label style={{ display: 'block', color: tokens.colors.text_primary, marginBottom: tokens.spacing.sm }}>Nombre</label>
            <input type="text" style={{ width: '100%', padding: tokens.spacing.md, borderRadius: tokens.radii.md, border: '1px solid', borderColor: tokens.colors.text_secondary }} />
          </div>
          <div>
            <label style={{ display: 'block', color: tokens.colors.text_primary, marginBottom: tokens.spacing.sm }}>Correo</label>
            <input type="email" style={{ width: '100%', padding: tokens.spacing.md, borderRadius: tokens.radii.md, border: '1px solid', borderColor: tokens.colors.text_secondary }} />
          </div>
          <div>
            <label style={{ display: 'block', color: tokens.colors.text_primary, marginBottom: tokens.spacing.sm }}>Dirección</label>
            <input type="text" style={{ width: '100%', padding: tokens.spacing.md, borderRadius: tokens.radii.md, border: '1px solid', borderColor: tokens.colors.text_secondary }} />
          </div>
          <BotonPrimario type="submit" onClick={(e) => { e.preventDefault(); alert('Pago procesado'); }}>
            Confirmar Pago
          </BotonPrimario>
        </form>
      </main>
      <Footer />
    </div>
  );
}
