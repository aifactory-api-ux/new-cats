import React, { useState } from 'react';
import { tokens } from '../../styles/tokens';

interface AcordeonProps {
  title: string;
  children: React.ReactNode;
  open?: boolean;
  onToggle?: () => void;
}

export function Acordeon({ title, children, open: initialOpen, onToggle }: AcordeonProps) {
  const [open, setOpen] = useState(initialOpen ?? false);

  const handleToggle = () => {
    const newState = !open;
    setOpen(newState);
    onToggle?.();
  };

  return (
    <div style={{ border: `1px solid ${tokens.colors.text_secondary}`, borderRadius: tokens.radii.md, marginBottom: tokens.spacing.sm }}>
      <div
        onClick={handleToggle}
        style={{
          padding: tokens.spacing.md,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: tokens.colors.surface,
        }}
      >
        <span style={{ font: tokens.typography.headings.h4, color: tokens.colors.text_primary }}>{title}</span>
        <span style={{ color: tokens.colors.text_secondary }}>{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div style={{ padding: tokens.spacing.md, backgroundColor: tokens.colors.background }}>
          {children}
        </div>
      )}
    </div>
  );
}
