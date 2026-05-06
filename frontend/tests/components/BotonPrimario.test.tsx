import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BotonPrimario } from '../src/components/ui/BotonPrimario';

describe('BotonPrimario', () => {
  it('renders children correctly', () => {
    render(<BotonPrimario>Click me</BotonPrimario>);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('calls onClick when clicked', () => {
    let clicked = false;
    const { container } = render(
      <BotonPrimario onClick={() => { clicked = true; }}>Click me</BotonPrimario>
    );
    container.querySelector('button')?.click();
    expect(clicked).toBe(true);
  });

  it('is disabled when disabled prop is true', () => {
    const { container } = render(
      <BotonPrimario disabled={true}>Disabled</BotonPrimario>
    );
    const button = container.querySelector('button');
    expect(button?.disabled).toBe(true);
  });

  it('shows loading text when loading', () => {
    render(<BotonPrimario loading={true}>Click me</BotonPrimario>);
    expect(screen.getByText('Cargando...')).toBeDefined();
  });

  it('renders with correct button type', () => {
    const { container } = render(
      <BotonPrimario type="submit">Submit</BotonPrimario>
    );
    expect(container.querySelector('button')?.type).toBe('submit');
  });
});