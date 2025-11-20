import { Menu, type MenuHandle } from '../Menu/Menu';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import './DocumentBar.css';
import templatesData from '../../data/templates.json';

type ViewMode = 'single' | 'grid';

import { type PageContent as PageContentType } from '../../types/blocks';

interface Page {
  id: string;
  label: string;
  content?: PageContentType;
}

interface DocumentBarProps {
  viewMode: ViewMode;
  selectedPage: Page;
  pages: Page[];
  menuRef: React.RefObject<MenuHandle | null>;
  onPageSelect: (item: { id: string; label: string }) => void;
  onActionSelect?: (action: { id: string; label: string }) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const DocumentBar = ({
  viewMode,
  selectedPage,
  pages,
  menuRef,
  onPageSelect,
  onActionSelect,
  onPrevPage,
  onNextPage,
}: DocumentBarProps) => {
  const handleDocumentPickerKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    // Only handle navigation when the button itself has focus (not when menu is open)
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onPrevPage();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      onNextPage();
    }
  };

  return (
    <div className="document-bar row gap-xs">
      {viewMode === 'single' && (
        <Button className="button-prev" onClick={onPrevPage}>
          <Icon name="chevron-left-small" />
        </Button>
      )}
      <Menu
        ref={menuRef}
        groups={[
          { items: pages },
          {
            items: [{ id: 'view-all-pages', label: 'View all pages' }],
          },
        ]}
        templatesGroups={[{ items: templatesData.templates }]}
        actionsGroups={[
          {
            items: [
              { id: 'rename-page', label: 'Rename page' },
              { id: 'duplicate', label: 'Duplicate' },
              { id: 'add-before', label: 'Add before' },
              { id: 'add-after', label: 'Add after' },
            ],
          },
        ]}
        selectedItemId={
          viewMode === 'grid' ? 'view-all-pages' : selectedPage.id
        }
        onItemSelect={(item) => {
          // Determine if this is an action or a page selection
          const actionIds = [
            'rename-page',
            'duplicate',
            'add-before',
            'add-after',
          ];
          if (actionIds.includes(item.id)) {
            onActionSelect?.(item);
          } else {
            onPageSelect(item);
          }
        }}
      >
        <Button
          align="center"
          className="button-document-picker"
          onKeyDown={handleDocumentPickerKeyDown}
        >
          <span className="icon-search">
            <Icon name="search" />
          </span>
          <span className="title-wrapper row items-center">
            <span className="document-title">
              {viewMode === 'grid' ? 'All pages' : selectedPage.label}
            </span>
            <Icon name="chevron-down-small" />
          </span>
          <small>⌘K</small>
        </Button>
      </Menu>
      {viewMode === 'single' && (
        <Button className="button-next" onClick={onNextPage}>
          <Icon name="chevron-right-small" />
        </Button>
      )}
    </div>
  );
};
