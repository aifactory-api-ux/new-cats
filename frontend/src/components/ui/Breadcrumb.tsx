import React from 'react';
import { tokens } from '../../styles/tokens';

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav style={{ display: 'flex', gap: tokens.spacing.sm, font: tokens.typography.body.small, color: tokens.colors.text_secondary }}>
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && <span>/</span>}
          <a href={item.href} style={{ color: tokens.colors.primary, textDecoration: 'none' }}>
            {item.label}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
}
