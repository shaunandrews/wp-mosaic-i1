import { useState } from 'react';
import { motion } from 'framer-motion';
import { type MenuDocumentPickerHandle } from '../MenuDocumentPicker/MenuDocumentPicker';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { ButtonWordPress } from '../ButtonWordPress/ButtonWordPress';
import { DocumentBar } from '../DocumentBar/DocumentBar';
import { MenuEditorOptions } from '../MenuEditorOptions/MenuEditorOptions';
import './EditorToolbar.css';

type ViewMode = 'single' | 'grid';

import { type PageContent as PageContentType } from '../../types/blocks';

interface Page {
  id: string;
  label: string;
  content?: PageContentType;
}

interface EditorToolbarProps {
  viewMode: ViewMode;
  selectedPage: Page;
  pages: Page[];
  menuRef: React.RefObject<MenuDocumentPickerHandle | null>;
  onPageSelect: (item: { id: string; label: string }) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onTogglePanel: (panelId: string) => void;
  onToggleChat: () => void;
  onToggleWordPressNav: () => void;
  onToggleViewMode: () => void;
  isChatOpen: boolean;
  isWordPressNavOpen: boolean;
  openPanelId?: string | null;
}

export const EditorToolbar = ({
  viewMode,
  selectedPage,
  pages,
  menuRef,
  onPageSelect,
  onPrevPage,
  onNextPage,
  onTogglePanel,
  onToggleChat,
  onToggleWordPressNav,
  onToggleViewMode,
  isChatOpen,
  isWordPressNavOpen,
  openPanelId,
}: EditorToolbarProps) => {
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined);

  const measureButton = (element: HTMLButtonElement | null) => {
    if (element && !buttonWidth) {
      // Only measure if we don't have a width yet
      const width = element.offsetWidth;
      if (width > 0) {
        setButtonWidth(width);
      }
    }
  };

  return (
    <div className="editor-toolbar row items-center justify-between">
      <div className="editor-toolbar-start row gap-m items-center">
        <ButtonWordPress
          isToggled={isWordPressNavOpen}
          hasSidebarOpen={isWordPressNavOpen || isChatOpen}
          onClick={onToggleWordPressNav}
        />
        <Button
          isToggled={viewMode === 'grid'}
          onClick={onToggleViewMode}
          className="gap-xs"
        >
          <Icon name="grid" />
          <span className="pr-xs">All pages</span>
        </Button>

        <div className="row gap-xxs items-center">
          <Button
            variant="primary"
            isToggled={openPanelId === 'inserter'}
            onClick={() => onTogglePanel('inserter')}
          >
            <Icon name="plus" />
          </Button>
          <Button
            isToggled={openPanelId === 'structure'}
            onClick={() => onTogglePanel('structure')}
          >
            <Icon name="list" />
          </Button>
          <Button>
            <Icon name="undo" />
          </Button>
          <Button>
            <Icon name="redo" />
          </Button>
        </div>
      </div>

      <DocumentBar
        viewMode={viewMode}
        selectedPage={selectedPage}
        pages={pages}
        menuRef={menuRef}
        onPageSelect={onPageSelect}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      />

      <div className="editor-toolbar-end row gap-xs pr-s">
        <Button>
          <Icon name="view-desktop" />
        </Button>
        <Button
          isToggled={openPanelId === 'settings'}
          onClick={() => onTogglePanel('settings')}
        >
          <Icon name="drawer-right" />
        </Button>
        <Button variant="primary" align="center" className="button-save">
          Save
        </Button>
        <MenuEditorOptions>
          <Button>
            <Icon name="more" />
          </Button>
        </MenuEditorOptions>
        <motion.div
          animate={{
            width: isChatOpen ? 0 : buttonWidth || 40,
            opacity: isChatOpen ? 0 : 1,
            marginLeft: isChatOpen ? '-8px' : '0px',
          }}
          transition={{
            width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
            marginLeft: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          }}
          style={{
            overflow: 'hidden',
            minWidth: 0,
          }}
        >
          <Button
            ref={measureButton}
            className="button-chat"
            align="center"
            isToggled={isChatOpen}
            onClick={onToggleChat}
          >
            {/* Assistant */}
            <Icon name="chat" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
