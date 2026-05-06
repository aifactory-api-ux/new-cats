import React from 'react';
import { BarraNavegacionSuperior } from '../components/ui/BarraNavegacionSuperior';
import { Footer } from '../components/ui/Footer';
import { BotonPrimario } from '../components/ui/BotonPrimario';
import { tokens } from '../styles/tokens';
import { useCart } from '../hooks/useCart';

export function Carrito() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <div style={{ fontFamily: tokens.typography.font_family, backgroundColor: tokens.colors.background, minHeight: '100vh' }}>
      <BarraNavegacionSuperior user={null} cartCount={cart.items.length} onSearch={() => {}} />
      <main style={{ padding: tokens.spacing.lg, maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ font: tokens.typography.headings.h1, color: tokens.colors.text_primary, marginBottom: tokens.spacing.xl }}>
          Carrito de Compras
        </h1>
        {cart.items.length === 0 ? (
          <p style={{ color: tokens.colors.text_secondary }}>Tu carrito está vacío.</p>
        ) : (
          <div>
            {cart.items.map(item => (
              <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: tokens.spacing.md, borderBottom: '1px solid', borderColor: tokens.colors.text_secondary, marginBottom: tokens.spacing.md }}>
                <div>
                  <p style={{ color: tokens.colors.text_primary }}>Producto ID: {item.productId}</p>
                  <p style={{ color: tokens.colors.text_secondary }}>Cantidad: {item.quantity}</p>
                </div>
                <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
                  <BotonPrimario onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                    +
                  </BotonPrimario>
                  <BotonPrimario onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                    -
                  </BotonPrimario>
                  <BotonPrimario onClick={() => removeFromCart(item.productId)}>
                    Eliminar
                  </BotonPrimario>
                </div>
              </div>
            ))}
            <div style={{ marginTop: tokens.spacing.xl, textAlign: 'right' }}>
              <BotonPrimario onClick={() => window.location.href = '/pago'}>
                Proceder al Pago
              </BotonPrimario>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
