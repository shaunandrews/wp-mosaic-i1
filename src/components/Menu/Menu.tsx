import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  useFloating,
  useClick,
  useInteractions,
  useDismiss,
  offset,
  flip,
  shift,
} from '@floating-ui/react';
import './Menu.css';
import { Button } from '../Button/Button';

interface MenuProps {
  children: React.ReactNode;
  items: Array<{ id: string; label: string }>;
  onItemSelect?: (item: { id: string; label: string }) => void;
}

export const Menu = ({ children, items, onItemSelect }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const firstItemRef = useRef<HTMLButtonElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    middleware: [offset(-2), flip(), shift()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const handleItemClick = (item: { id: string; label: string }) => {
    onItemSelect?.(item);
    setIsOpen(false);
    // Move focus back to the document picker button
    setTimeout(() => {
      const referenceElement = refs.reference.current;
      if (referenceElement && referenceElement instanceof HTMLElement) {
        const button = referenceElement.querySelector('button');
        if (button) {
          button.focus();
        }
      }
    }, 0);
  };

  useEffect(() => {
    if (isOpen && firstItemRef.current) {
      // Use setTimeout to ensure the menu is fully rendered before focusing
      setTimeout(() => {
        firstItemRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ display: 'inline-block' }}
      >
        {React.isValidElement(children)
          ? React.cloneElement(children, {
              className:
                `${(children.props as { className?: string }).className || ''} ${isOpen ? 'active' : ''}`.trim(),
            } as Partial<{ className: string }>)
          : children}
      </div>
      {isOpen &&
        createPortal(
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="menu"
          >
            <ul className="menu-list p-xxs col gap-xxs">
              {items.map((item, index) => (
                <li key={item.id} className="menu-item">
                  <Button
                    ref={index === 0 ? firstItemRef : null}
                    className="menu-item-button"
                    onClick={() => handleItemClick(item)}
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </>
  );
};
