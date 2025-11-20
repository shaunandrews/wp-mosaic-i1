import {
  MenuDocumentPicker,
  type MenuDocumentPickerHandle,
} from '../MenuDocumentPicker/MenuDocumentPicker';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { motion, AnimatePresence } from 'framer-motion';
import './DocumentBar.css';

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
  menuRef: React.RefObject<MenuDocumentPickerHandle | null>;
  onPageSelect: (item: { id: string; label: string }) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const DocumentBar = ({
  viewMode,
  selectedPage,
  pages,
  menuRef,
  onPageSelect,
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
      <MenuDocumentPicker
        ref={menuRef}
        groups={[
          { items: pages },
          {
            items: [{ id: 'view-all-pages', label: 'View all pages' }],
          },
        ]}
        selectedItemId={
          viewMode === 'grid' ? 'view-all-pages' : selectedPage.id
        }
        onItemSelect={onPageSelect}
      >
        <Button
          align="center"
          className="button-document-picker"
          onKeyDown={handleDocumentPickerKeyDown}
        >
          <span className="title-wrapper row items-center">
            <span className="document-title">
              <span
                className={`breadcrumb-top-level ${
                  viewMode === 'single' ? 'is-secondary' : ''
                }`}
              >
                Pages
              </span>
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
        </Button>
      </MenuDocumentPicker>
      {viewMode === 'single' && (
        <Button className="button-next" onClick={onNextPage}>
          <Icon name="chevron-right-small" />
        </Button>
      )}
    </div>
  );
};
