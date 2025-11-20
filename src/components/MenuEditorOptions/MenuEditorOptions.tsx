import React, { useState } from 'react';
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
import './MenuEditorOptions.css';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

interface MenuEditorOptionsProps {
  children: React.ReactNode;
}

interface MenuItem {
  id: string;
  label: string;
  description?: string;
  shortcut?: string;
  icon?: 'check' | 'external-link' | 'download' | 'styles' | 'plugin';
  isSelected?: boolean;
  isHighlighted?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: 'VIEW',
    items: [
      {
        id: 'top-toolbar',
        label: 'Top toolbar',
        description: 'Access all block and document tools in a single place',
        isHighlighted: true,
      },
      {
        id: 'distraction-free',
        label: 'Distraction free',
        description: 'Write with calmness',
        shortcut: '⌘\\',
      },
      {
        id: 'spotlight-mode',
        label: 'Spotlight mode',
        description: 'Focus on one block at a time',
      },
    ],
  },
  {
    title: 'EDITOR',
    items: [
      {
        id: 'visual-editor',
        label: 'Visual editor',
        icon: 'check',
        isSelected: true,
      },
      {
        id: 'code-editor',
        label: 'Code editor',
        shortcut: '⌃⌘M',
      },
    ],
  },
  {
    title: 'PLUGINS',
    items: [
      {
        id: 'styles',
        label: 'Styles',
        icon: 'styles',
      },
      {
        id: 'jetpack',
        label: 'Jetpack',
        icon: 'plugin',
      },
    ],
  },
  {
    title: 'TOOLS',
    items: [
      {
        id: 'keyboard-shortcuts',
        label: 'Keyboard shortcuts',
        shortcut: '⌃H',
      },
      {
        id: 'command-palette',
        label: 'Command palette',
        shortcut: '⌘K',
      },
      {
        id: 'copy-all-blocks',
        label: 'Copy all blocks',
      },
      {
        id: 'help',
        label: 'Help',
        icon: 'external-link',
      },
      {
        id: 'export',
        label: 'Export',
        description: 'Download your theme with updated templates and styles.',
        icon: 'download',
      },
      {
        id: 'welcome-guide',
        label: 'Welcome Guide',
      },
    ],
  },
];

export const MenuEditorOptions = ({ children }: MenuEditorOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-end',
    middleware: [offset(6), flip(), shift()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const handleItemClick = (item: MenuItem) => {
    // Handle item click - can be extended with callbacks
    console.log('Menu item clicked:', item.id);
    setIsOpen(false);
  };

  const renderShortcut = (shortcut?: string) => {
    if (!shortcut) return null;
    return <span className="menu-editor-options-shortcut">{shortcut}</span>;
  };

  const renderIcon = (icon?: MenuItem['icon'], isSelected?: boolean) => {
    if (isSelected && icon === 'check') {
      return <Icon name="check" />;
    }
    if (icon && icon !== 'check') {
      return <Icon name={icon} />;
    }
    return null;
  };

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ display: 'inline-block' }}
      >
        {React.isValidElement(children)
          ? React.cloneElement(children, {
              className: `${
                (children.props as { className?: string }).className || ''
              } ${isOpen ? 'active' : ''}`.trim(),
            } as Partial<{ className: string }>)
          : children}
      </div>
      {isOpen &&
        createPortal(
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="menu-editor-options"
          >
            <div className="menu-editor-options-list col">
              {menuSections.map((section, sectionIndex) => (
                <div key={section.title}>
                  <div className="menu-editor-options-section">
                    <div className="menu-editor-options-section-title">
                      {section.title}
                    </div>
                    <ul className="menu-editor-options-group col">
                      {section.items.map((item) => (
                        <li key={item.id} className="menu-editor-options-item">
                          <Button
                            className={`menu-editor-options-button ${
                              item.isHighlighted ? 'is-highlighted' : ''
                            } ${item.isSelected ? 'is-selected' : ''}`}
                            onClick={() => handleItemClick(item)}
                          >
                            <div className="menu-editor-options-button-content col">
                              <div className="menu-editor-options-button-label row items-center justify-between">
                                <span>{item.label}</span>
                                <div className="menu-editor-options-button-right row items-center gap-xs">
                                  {renderShortcut(item.shortcut)}
                                  {renderIcon(item.icon, item.isSelected)}
                                </div>
                              </div>
                              {item.description && (
                                <div className="menu-editor-options-button-description">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {sectionIndex < menuSections.length - 1 && (
                    <div className="menu-editor-options-divider" />
                  )}
                </div>
              ))}
              <div className="menu-editor-options-divider" />
              <div className="menu-editor-options-section">
                <ul className="menu-editor-options-group col">
                  <li className="menu-editor-options-item">
                    <Button
                      className="menu-editor-options-button"
                      onClick={() => handleItemClick({ id: 'preferences', label: 'Preferences' })}
                    >
                      <span>Preferences</span>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

