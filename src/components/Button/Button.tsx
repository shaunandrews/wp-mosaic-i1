import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  align?: 'center' | 'left' | 'right';
  type?: 'default' | 'primary';
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  align = 'left',
  type = 'default',
  className = '',
  ...props 
}, ref) => {
  const alignClass = `align-${align}`;
  const typeClass = `type-${type}`;
  const classes = `button ${alignClass} ${typeClass} ${className}`.trim();

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

