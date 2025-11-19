import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  align?: 'center' | 'left' | 'right';
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  align = 'left',
  className = '',
  ...props 
}, ref) => {
  const alignClass = `align-${align}`;
  const classes = `button ${alignClass} ${className}`.trim();

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

