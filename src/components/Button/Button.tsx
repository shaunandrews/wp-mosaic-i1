import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  align?: 'center' | 'left' | 'right';
  variant?: 'default' | 'primary';
  layer?: 'surface' | 'background';
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  align = 'left',
  variant = 'default',
  layer = 'surface',
  className = '',
  ...props 
}, ref) => {
  const alignClass = `align-${align}`;
  const typeClass = `type-${variant}`;
  const layerClass = `layer-${layer}`;
  const classes = `button ${alignClass} ${typeClass} ${layerClass} ${className}`.trim();

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

