import React from 'react';
import { tokens } from '../../styles/tokens';

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  actions?: React.ReactNode;
}

export function Modal({ open, title, children, onClose, actions }: ModalProps) {
  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: tokens.colors.surface,
        borderRadius: tokens.radii.lg,
        padding: tokens.spacing.xl,
        minWidth: '400px',
        maxWidth: '90vw',
        boxShadow: tokens.shadows.dropdown,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.lg }}>
          <h2 style={{ font: tokens.typography.headings.h3, color: tokens.colors.text_primary, margin: 0 }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: tokens.colors.text_secondary,
            }}
          >
            ×
          </button>
        </div>
        <div>{children}</div>
        {actions && <div style={{ display: 'flex', gap: tokens.spacing.md, justifyContent: 'flex-end', marginTop: tokens.spacing.lg }}>
          {actions}
        </div>}
      </div>
    </div>
  );
}
