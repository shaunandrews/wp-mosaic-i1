import { Menu, type MenuHandle } from '../Menu/Menu';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { motion, AnimatePresence } from 'framer-motion';
import './DocumentBar.css';
import templatesData from '../../data/templates.json';
import actionsData from '../../data/actions.json';

type ViewMode = 'single' | 'grid';

import { type PageContent as PageContentType } from '../../types/blocks';

interface Page {
  id: string;
  label: string;
  content?: PageContentType;
}

interface Action {
  id: string;
  label: string;
  contexts?: string[];
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

const getContextualActions = (
  actions: Action[],
  viewMode: ViewMode,
  hasBlockSelection: boolean = false
): Array<{ id: string; label: string }> => {
  const currentContexts: string[] = [];

  if (viewMode === 'single') {
    currentContexts.push('page');
  } else if (viewMode === 'grid') {
    currentContexts.push('grid');
  }

  if (hasBlockSelection) {
    currentContexts.push('block');
  }

  return actions
    .filter((action) => {
      // If no contexts specified, show in all contexts (backward compatibility)
      if (!action.contexts || action.contexts.length === 0) {
        return true;
      }
      // Show if any of the action's contexts match current contexts
      return action.contexts.some((context) =>
        currentContexts.includes(context)
      );
    })
    .map(({ id, label }) => ({ id, label }));
};

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
  // Get contextual actions based on current view mode
  // TODO: Pass hasBlockSelection when block selection is implemented
  const contextualActions = getContextualActions(
    actionsData.actions as Action[],
    viewMode,
    false
  );

  // Get all action IDs for determining if an item is an action
  const allActionIds = actionsData.actions.map((action) => action.id);

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
        actionsGroups={[{ items: contextualActions }]}
        selectedItemId={
          viewMode === 'grid' ? 'view-all-pages' : selectedPage.id
        }
        onItemSelect={(item) => {
          // Determine if this is an action or a page selection
          if (allActionIds.includes(item.id)) {
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
              <span className="breadcrumb-top-level">Pages</span>
              <AnimatePresence>
                {viewMode === 'single' && (
                  <motion.span
                    key="breadcrumb-extra"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: 'inline-flex',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span className="breadcrumb-divider ml-xs">/</span>
                    <span className="breadcrumb-page-name ml-xs">
                      {selectedPage.label}
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
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
