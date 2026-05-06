import React, { useState } from 'react';
import { BarraNavegacionSuperior } from '../components/ui/BarraNavegacionSuperior';
import { Footer } from '../components/ui/Footer';
import { CampoTexto } from '../components/ui/CampoTexto';
import { BotonPrimario } from '../components/ui/BotonPrimario';
import { tokens } from '../styles/tokens';
import { useAuth } from '../hooks/useAuth';

export function MiCuenta() {
  const { user, login, register, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await register(email, name, password);
    }
  };

  return (
    <div style={{ fontFamily: tokens.typography.font_family, backgroundColor: tokens.colors.background, minHeight: '100vh' }}>
      <BarraNavegacionSuperior user={user} cartCount={0} onSearch={() => {}} />
      <main style={{ padding: tokens.spacing.lg, maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ font: tokens.typography.headings.h1, color: tokens.colors.text_primary, marginBottom: tokens.spacing.xl }}>
          {user ? 'Mi Cuenta' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
        </h1>
        {user ? (
          <div>
            <p style={{ color: tokens.colors.text_primary }}>Bienvenido, {user.name}</p>
            <p style={{ color: tokens.colors.text_secondary }}>{user.email}</p>
            <div style={{ marginTop: tokens.spacing.xl }}>
              <BotonPrimario onClick={logout}>Cerrar Sesión</BotonPrimario>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.lg }}>
            {!isLogin && (
              <CampoTexto label="Nombre" value={name} onChange={setName} required />
            )}
            <CampoTexto label="Correo" value={email} onChange={setEmail} type="email" required />
            <CampoTexto label="Contraseña" value={password} onChange={setPassword} type="password" required />
            <BotonPrimario type="submit">
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </BotonPrimario>
            <p style={{ textAlign: 'center', color: tokens.colors.text_secondary }}>
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <span
                style={{ color: tokens.colors.primary, cursor: 'pointer', marginLeft: tokens.spacing.xs }}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? ' Regístrate' : ' Inicia sesión'}
              </span>
            </p>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
