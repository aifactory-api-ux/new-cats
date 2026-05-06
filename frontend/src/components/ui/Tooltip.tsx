import React, { useState } from 'react';
import { tokens } from '../../styles/tokens';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: tokens.spacing.sm,
          backgroundColor: tokens.colors.text_primary,
          color: '#fff',
          borderRadius: tokens.radii.sm,
          fontSize: '12px',
          whiteSpace: 'nowrap',
          zIndex: 100,
        }}>
          {content}
        </div>
      )}
    </div>
  );
}
