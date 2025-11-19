import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    const button = container.querySelector('.button.type-primary');
    expect(button).toBeInTheDocument();
  });

  it('applies align classes correctly', () => {
    const { container } = render(<Button align="center">Centered</Button>);
    const button = container.querySelector('.button.align-center');
    expect(button).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    button.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
