import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampoTexto } from '../src/components/ui/CampoTexto';

describe('CampoTexto', () => {
  it('renders label correctly', () => {
    render(<CampoTexto label="Email" value="" onChange={() => {}} />);
    expect(screen.getByText('Email')).toBeDefined();
  });

  it('renders with required indicator', () => {
    render(<CampoTexto label="Email" value="" onChange={() => {}} required />);
    expect(screen.getByText('Email *')).toBeDefined();
  });

  it('renders input with correct value', () => {
    render(<CampoTexto label="Name" value="Test" onChange={() => {}} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Test');
  });

  it('calls onChange when typing', () => {
    let newValue = '';
    const handleChange = (v: string) => { newValue = v; };
    render(<CampoTexto label="Name" value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(newValue).toBe('New Value');
  });

  it('renders error message when provided', () => {
    render(<CampoTexto label="Email" value="" onChange={() => {}} error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeDefined();
  });

  it('renders placeholder text', () => {
    render(<CampoTexto label="Email" value="" onChange={() => {}} placeholder="Enter your email" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.placeholder).toBe('Enter your email');
  });

  it('renders with correct type attribute', () => {
    render(<CampoTexto label="Password" value="" onChange={() => {}} type="password" />);
    const input = screen.getByTestId('campo-texto-input') as HTMLInputElement;
    expect(input.type).toBe('password');
  });
});