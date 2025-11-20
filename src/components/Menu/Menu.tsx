import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
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
  templatesGroups?: MenuGroup[];
  actionsGroups?: MenuGroup[];
  selectedItemId?: string;
  onItemSelect?: (item: { id: string; label: string }) => void;
}

export interface MenuHandle {
  open: (focusSearch?: boolean) => void;
}

export const Menu = forwardRef<MenuHandle, MenuProps>(
  (
    {
      children,
      groups,
      templatesGroups,
      actionsGroups,
      selectedItemId,
      onItemSelect,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<
      'pages' | 'templates' | 'actions'
    >('pages');
    const [searchQuery, setSearchQuery] = useState('');
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);
    const firstItemRef = useRef<HTMLButtonElement>(null);
    const selectedItemRef = useRef<HTMLButtonElement>(null);
    const viewAllPagesRef = useRef<HTMLButtonElement>(null);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const scrollableContainerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const shouldFocusSearchRef = useRef(false);

    // Extract "view-all-pages" item from the last group if it exists (only for pages)
    const viewAllPagesItem =
      activeTab === 'pages' &&
      groups.length > 0 &&
      groups[groups.length - 1].items.length === 1 &&
      groups[groups.length - 1].items[0].id === 'view-all-pages'
        ? groups[groups.length - 1].items[0]
        : null;

    // Flatten all items for search
    const allPages = groups.flatMap((group) => group.items);
    const allTemplates = (templatesGroups || []).flatMap((group) => group.items);
    const allActions = (actionsGroups || []).flatMap((group) => group.items);

    // Filter function for search
    const getFilteredResults = (
      query: string
    ): { pages: MenuGroup[]; templates: MenuGroup[]; actions: MenuGroup[] } => {
      const lowerQuery = query.toLowerCase();
      const filterItems = (items: Array<{ id: string; label: string }>) =>
        items.filter((item) =>
          item.label.toLowerCase().includes(lowerQuery)
        );

      return {
        pages: filterItems(allPages).length > 0
          ? [{ items: filterItems(allPages) }]
          : [],
        templates: filterItems(allTemplates).length > 0
          ? [{ items: filterItems(allTemplates) }]
          : [],
        actions: filterItems(allActions).length > 0
          ? [{ items: filterItems(allActions) }]
          : [],
      };
    };

    // Determine which groups to display based on active tab or search
    const isSearching = searchQuery.trim().length > 0;
    const filteredResults = isSearching ? getFilteredResults(searchQuery) : null;

    const displayGroups = isSearching
      ? [
          ...(filteredResults?.pages || []),
          ...(filteredResults?.templates || []),
          ...(filteredResults?.actions || []),
        ]
      : activeTab === 'pages'
        ? viewAllPagesItem
          ? groups.slice(0, -1)
          : groups
        : activeTab === 'templates'
          ? templatesGroups || []
          : actionsGroups || [];

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
      if (!scrollableContainerRef.current) return [];
      // Get all menu items from the scrollable container and footer
      const container = scrollableContainerRef.current.closest('.menu-list');
      if (!container) return [];
      const allItems = Array.from(
        container.querySelectorAll<HTMLButtonElement>('.button-menu-item')
      );
      return allItems;
    };

    const checkScrollState = useCallback(() => {
      if (!scrollableContainerRef.current) return;
      const container = scrollableContainerRef.current;
      const canScrollUpValue = container.scrollTop > 0;
      const canScrollDownValue =
        container.scrollTop + container.clientHeight < container.scrollHeight;
      setCanScrollUp(canScrollUpValue);
      setCanScrollDown(canScrollDownValue);
    }, []);

    // Reset scroll position when switching tabs or search query changes
    useEffect(() => {
      if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollTop = 0;
        checkScrollState();
      }
    }, [activeTab, searchQuery, checkScrollState]);

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const items = getAllMenuItems();
        if (items.length > 0 && items[0]) {
          items[0].focus();
          items[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) return;

      // Handle tab switching with left/right arrows
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        // Don't interfere if typing in search input
        if (
          document.activeElement === searchInputRef.current ||
          (e.target instanceof HTMLElement && e.target.tagName === 'INPUT')
        ) {
          return;
        }

        e.preventDefault();
        const tabs: Array<'pages' | 'templates' | 'actions'> = [
          'pages',
          'templates',
          'actions',
        ];
        const currentIndex = tabs.indexOf(activeTab);
        if (e.key === 'ArrowLeft') {
          const prevIndex =
            currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
          setActiveTab(tabs[prevIndex]);
        } else {
          const nextIndex =
            currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
          setActiveTab(tabs[nextIndex]);
        }
        return;
      }

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
          // ArrowUp: if on first item, go to search input
          if (currentIndex === 0) {
            searchInputRef.current?.focus();
            return;
          }
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }

        const nextItem = items[nextIndex];
        if (nextItem) {
          nextItem.focus();
          nextItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
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
            if (
              selectedItemId === viewAllPagesItem?.id &&
              viewAllPagesRef.current
            ) {
              viewAllPagesRef.current.focus();
            } else if (selectedItemRef.current) {
              selectedItemRef.current.focus();
              selectedItemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
              });
            } else if (firstItemRef.current) {
              firstItemRef.current.focus();
              firstItemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
              });
            }
          }
          // Reset the flag after focusing
          shouldFocusSearchRef.current = false;
          // Check scroll state after menu opens
          checkScrollState();
        }, 0);
      }
    }, [isOpen, selectedItemId, checkScrollState, activeTab]);

    useEffect(() => {
      if (!isOpen || !scrollableContainerRef.current) return;

      const container = scrollableContainerRef.current;
      checkScrollState();

      const handleScroll = () => {
        checkScrollState();
      };

      container.addEventListener('scroll', handleScroll);
      // Also check on resize in case content changes
      window.addEventListener('resize', checkScrollState);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', checkScrollState);
      };
    }, [isOpen, checkScrollState, activeTab, searchQuery]);

    // Reset search when menu closes
    useEffect(() => {
      if (!isOpen) {
        setSearchQuery('');
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
              <div className="menu-list col" onKeyDown={handleKeyDown}>
                <div
                  className={`menu-header ${canScrollUp ? 'has-gradient-top has-scrolled' : ''}`}
                >
                  <div className="menu-search">
                    <Icon name="search" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Pages, posts, settings, and more&hellip;"
                      className="menu-search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                    />
                  </div>
                  {!isSearching && (
                    <div className="menu-tabs row mx-xs my-xxs">
                      <Button
                        align="center"
                        className={`menu-tab ${activeTab === 'pages' ? 'is-active' : ''}`}
                        onClick={() => setActiveTab('pages')}
                      >
                        Pages
                      </Button>
                      <Button
                        align="center"
                        className={`menu-tab ${activeTab === 'templates' ? 'is-active' : ''}`}
                        onClick={() => setActiveTab('templates')}
                      >
                        Templates
                      </Button>
                      <Button
                        align="center"
                        className={`menu-tab ${activeTab === 'actions' ? 'is-active' : ''}`}
                        onClick={() => setActiveTab('actions')}
                      >
                        Actions
                      </Button>
                    </div>
                  )}
                </div>
                <div
                  ref={scrollableContainerRef}
                  className="menu-list-scrollable"
                >
                  <div ref={menuContainerRef}>
                    {displayGroups.length === 0 && isSearching ? (
                      <div className="menu-empty-state p-s">
                        <p className="menu-empty-text">No results found</p>
                      </div>
                    ) : (
                      displayGroups.map((group, groupIndex) => {
                        let itemIndex = 0;
                        if (groupIndex > 0) {
                          // Calculate the starting index for this group
                          for (let i = 0; i < groupIndex; i++) {
                            itemIndex += displayGroups[i].items.length;
                          }
                        }

                        // Determine category label for search results
                        // Since filtered results are added in order: pages, templates, actions
                        let categoryLabel: string | null = null;
                        if (isSearching && filteredResults) {
                          const pagesCount = filteredResults.pages.length;
                          const templatesCount = filteredResults.templates.length;
                          
                          if (groupIndex < pagesCount) {
                            categoryLabel = 'Pages';
                          } else if (groupIndex < pagesCount + templatesCount) {
                            categoryLabel = 'Templates';
                          } else {
                            categoryLabel = 'Actions';
                          }
                        }

                        return (
                          <ul
                            key={groupIndex}
                            className="menu-group col gap-xxs p-xs"
                          >
                            {categoryLabel && (
                              <li className="menu-group-heading my-xxs ml-s">
                                <h3>{categoryLabel}</h3>
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
                                    </span>
                                  </Button>
                                </li>
                              );
                            })}
                          </ul>
                        );
                      })
                    )}
                  </div>
                </div>
                {viewAllPagesItem && !isSearching && (
                  <div
                    className={`menu-footer ${canScrollDown ? 'has-gradient-bottom' : ''}`}
                  >
                    <ul className="menu-group col gap-xxs p-xs">
                      <li className="menu-item">
                        <Button
                          ref={(el) => {
                            if (selectedItemId === viewAllPagesItem.id) {
                              viewAllPagesRef.current = el;
                            }
                          }}
                          className={`button-menu-item ${selectedItemId === viewAllPagesItem.id ? 'is-selected' : ''}`}
                          onClick={() => handleItemClick(viewAllPagesItem)}
                        >
                          <span className="menu-item-content full-width row items-center gap-xxs">
                            {selectedItemId === viewAllPagesItem.id && (
                              <Icon name="check" />
                            )}
                            <span>{viewAllPagesItem.label}</span>
                            <small className="menu-item-shortcut">⌘⇧P</small>
                          </span>
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}
      </>
    );
  }
);
