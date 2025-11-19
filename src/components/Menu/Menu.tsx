import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
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
import { Icon } from '../Icon/Icon';

interface MenuGroup {
  items: Array<{ id: string; label: string }>;
}

interface MenuProps {
  children: React.ReactNode;
  groups: MenuGroup[];
  selectedItemId?: string;
  onItemSelect?: (item: { id: string; label: string }) => void;
}

export interface MenuHandle {
  open: (focusSearch?: boolean) => void;
}

export const Menu = forwardRef<MenuHandle, MenuProps>(
  ({ children, groups, selectedItemId, onItemSelect }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const firstItemRef = useRef<HTMLButtonElement>(null);
    const selectedItemRef = useRef<HTMLButtonElement>(null);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const shouldFocusSearchRef = useRef(false);

    const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'bottom-start',
      middleware: [offset(6), flip(), shift()],
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
    ]);

    useImperativeHandle(ref, () => ({
      open: (focusSearch = false) => {
        shouldFocusSearchRef.current = focusSearch;
        setIsOpen(true);
      },
    }));

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

    const getAllMenuItems = (): HTMLButtonElement[] => {
      if (!menuContainerRef.current) return [];
      return Array.from(
        menuContainerRef.current.querySelectorAll<HTMLButtonElement>(
          '.button-menu-item'
        )
      );
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) return;

      // Don't interfere with typing in the search input
      if (
        document.activeElement === searchInputRef.current ||
        (e.target instanceof HTMLElement && e.target.tagName === 'INPUT')
      ) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = getAllMenuItems();
        if (items.length === 0) return;

        const currentIndex = items.findIndex(
          (item) => item === document.activeElement
        );

        let nextIndex: number;
        if (e.key === 'ArrowDown') {
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }

        items[nextIndex]?.focus();
      }
    };

    useEffect(() => {
      if (isOpen) {
        // Use setTimeout to ensure the menu is fully rendered before focusing
        setTimeout(() => {
          if (shouldFocusSearchRef.current) {
            // Focus on the search input when opened via cmd-k
            searchInputRef.current?.focus();
          } else {
            // Focus on the selected item if it exists, otherwise focus on the first item
            if (selectedItemRef.current) {
              selectedItemRef.current.focus();
            } else if (firstItemRef.current) {
              firstItemRef.current.focus();
            }
          }
          // Reset the flag after focusing
          shouldFocusSearchRef.current = false;
        }, 0);
      }
    }, [isOpen, selectedItemId]);

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
              <div
                ref={menuContainerRef}
                className="menu-list col"
                onKeyDown={handleKeyDown}
              >
                <div className="menu-search">
                  <Icon name="search" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Pages, posts, settings, and more&hellip;"
                    className="menu-search-input"
                  />
                </div>
                {groups.map((group, groupIndex) => {
                  let itemIndex = 0;
                  if (groupIndex > 0) {
                    // Calculate the starting index for this group
                    for (let i = 0; i < groupIndex; i++) {
                      itemIndex += groups[i].items.length;
                    }
                  }
                  return (
                    <ul
                      key={groupIndex}
                      className="menu-group col gap-xxs p-xs"
                    >
                      {groupIndex === 0 && (
                        <li className="menu-group-heading my-xxs ml-s">
                          <h3>Recent pages</h3>
                        </li>
                      )}
                      {group.items.map((item) => {
                        const isSelected = selectedItemId === item.id;
                        const currentIndex = itemIndex++;
                        return (
                          <li key={item.id} className="menu-item">
                            <Button
                              ref={(el) => {
                                if (currentIndex === 0) {
                                  firstItemRef.current = el;
                                }
                                if (isSelected) {
                                  selectedItemRef.current = el;
                                }
                              }}
                              className={`button-menu-item ${isSelected ? 'is-selected' : ''}`}
                              onClick={() => handleItemClick(item)}
                            >
                              <span className="menu-item-content full-width row items-center gap-xxs">
                                {isSelected && <Icon name="check" />}
                                <span>{item.label}</span>
                                {item.id === 'view-all-pages' && (
                                  <small className="menu-item-shortcut">
                                    ⌘⇧P
                                  </small>
                                )}
                              </span>
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  );
                })}
              </div>
            </div>,
            document.body
          )}
      </>
    );
  }
);
