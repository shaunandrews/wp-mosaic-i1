import { useState } from 'react';
import {
  useFloating,
  useHover,
  useInteractions,
  useRole,
  useDismiss,
  offset,
  flip,
  shift,
} from '@floating-ui/react';
import './Tooltip.css';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip = ({
  children,
  content,
  placement = 'top',
  delay = 0,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [offset(8), flip(), shift()],
  });

  const hover = useHover(context, { delay });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="tooltip"
        >
          {content}
        </div>
      )}
    </>
  );
};

