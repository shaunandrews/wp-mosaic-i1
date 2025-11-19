import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  align?: 'center' | 'left' | 'right';
  variant?: 'default' | 'primary';
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  align = 'left',
  variant = 'default',
  className = '',
  ...props 
}, ref) => {
  const alignClass = `align-${align}`;
  const typeClass = `type-${variant}`;
  const classes = `button ${alignClass} ${typeClass} ${className}`.trim();

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

