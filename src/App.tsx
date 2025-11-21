import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import { type MenuDocumentPickerHandle } from './components/MenuDocumentPicker/MenuDocumentPicker';
import { EditorToolbar } from './components/EditorToolbar/EditorToolbar';
import { Button } from './components/Button/Button';
import { Icon } from './components/Icon/Icon';
import {
  PageViewProvider,
  type Page,
} from './components/PageView/PageViewContext';
import { PageView } from './components/PageView/PageView';
import { usePageView } from './components/PageView/usePageView';
import { StructurePanel } from './components/StructurePanel/StructurePanel';
import pagesData from './data/pages.json';

const pages = pagesData.pages as Page[];

type PanelPosition = 'left' | 'right';
type PanelState = {
  left: string | null;
  right: string | null;
};

interface PanelConfig {
  id: string;
  position: PanelPosition;
  buttonIcon: string;
}

const PANEL_CONFIG: PanelConfig[] = [
  { id: 'structure', position: 'left', buttonIcon: 'list' },
  { id: 'inserter', position: 'left', buttonIcon: 'plus' },
  { id: 'settings', position: 'right', buttonIcon: 'drawer-right' },
];

function AppContent() {
  const {
    viewMode,
    selectedPage,
    pages: contextPages,
    selectedBlockId,
    setViewMode,
    selectPage,
    selectBlock,
    navigatePrev,
    navigateNext,
  } = usePageView();

  const handleBlockClick = (blockId: string) => {
    // Toggle selection: if clicking the same block, deselect it
    if (selectedBlockId === blockId) {
      selectBlock(null);
    } else {
      selectBlock(blockId);
    }
  };
  const [panelState, setPanelState] = useState<PanelState>({
    left: null,
    right: null,
  });
  const [isChatOpen, setIsChatOpen] = useState(() => {
    const saved = localStorage.getItem('chatOpen');
    return saved !== null ? saved === 'true' : true;
  });
  const [isWordPressNavOpen, setIsWordPressNavOpen] = useState(() => {
    const saved = localStorage.getItem('wordPressNavOpen');
    return saved !== null ? saved === 'true' : false;
  });
  const menuRef = useRef<MenuDocumentPickerHandle>(null);

  const getOpenPanelAt = (position: PanelPosition): string | null => {
    return panelState[position];
  };

  const getOpenPanelId = (): string | null => {
    return panelState.left || panelState.right;
  };

  const togglePanel = (panelId: string) => {
    const config = PANEL_CONFIG.find((p) => p.id === panelId);
    if (!config) return;

    setPanelState((prev) => {
      const currentPanelAtPosition = prev[config.position];

      // If this panel is already open, close it
      if (currentPanelAtPosition === panelId) {
        return {
          ...prev,
          [config.position]: null,
        };
      }

      // Otherwise, open this panel (closing any panel at the same position)
      return {
        ...prev,
        [config.position]: panelId,
      };
    });
  };

  const handlePageSelect = (item: { id: string; label: string }) => {
    if (item.id === 'view-all-pages') {
      setViewMode('grid');
    } else {
      const page = contextPages.find((p) => p.id === item.id);
      if (page) {
        selectPage(page, 'menu');
      }
    }
  };

  const handlePrevPage = () => {
    navigatePrev();
  };

  const handleNextPage = () => {
    navigateNext();
  };

  const handleStructurePageSelect = (page: Page) => {
    selectPage(page, 'menu');
  };

  useEffect(() => {
    localStorage.setItem('chatOpen', String(isChatOpen));
  }, [isChatOpen]);

  useEffect(() => {
    localStorage.setItem('wordPressNavOpen', String(isWordPressNavOpen));
  }, [isWordPressNavOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Command-K (Mac) or Ctrl-K (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        menuRef.current?.open(true);
      }
      // Check for Command-Shift-P (Mac) or Ctrl-Shift-P (Windows/Linux)
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === 'p'
      ) {
        event.preventDefault();
        if (viewMode === 'grid') {
          if (selectedPage) {
            selectPage(selectedPage, 'menu');
          }
        } else {
          setViewMode('grid');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [viewMode, selectedPage, selectPage]);

  return (
    <div className="app row">
      <AnimatePresence>
        {isWordPressNavOpen && (
          <motion.div
            className="wordpress-nav col"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
            }}
            style={{ overflow: 'hidden', minWidth: 0 }}
          >
            <header className="row items-center mt-s p-s pl-m">
              <div className="row items-center gap-xs full-height">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 12C22 6.49 17.51 2 12 2C6.48 2 2 6.49 2 12C2 17.52 6.48 22 12 22C17.51 22 22 17.52 22 12ZM9.78 17.37L6.37 8.22C6.92 8.2 7.54 8.14 7.54 8.14C8.04 8.08 7.98 7.01 7.48 7.03C7.48 7.03 6.03 7.14 5.11 7.14C4.93 7.14 4.74 7.14 4.53 7.13C6.12 4.69 8.87 3.11 12 3.11C14.33 3.11 16.45 3.98 18.05 5.45C17.37 5.34 16.4 5.84 16.4 7.03C16.4 7.77 16.85 8.39 17.3 9.13C17.65 9.74 17.85 10.49 17.85 11.59C17.85 13.08 16.45 16.59 16.45 16.59L13.42 8.22C13.96 8.2 14.24 8.05 14.24 8.05C14.74 8 14.68 6.8 14.18 6.83C14.18 6.83 12.74 6.95 11.8 6.95C10.93 6.95 9.47 6.83 9.47 6.83C8.97 6.8 8.91 8.03 9.41 8.05L10.33 8.13L11.59 11.54L9.78 17.37ZM19.41 12C19.65 11.36 20.15 10.13 19.84 7.75C20.54 9.04 20.89 10.46 20.89 12C20.89 15.29 19.16 18.24 16.49 19.78C17.46 17.19 18.43 14.58 19.41 12ZM8.1 20.09C5.12 18.65 3.11 15.53 3.11 12C3.11 10.7 3.34 9.52 3.83 8.41C5.25 12.3 6.67 16.2 8.1 20.09ZM12.13 13.46L14.71 20.44C13.85 20.73 12.95 20.89 12 20.89C11.21 20.89 10.43 20.78 9.71 20.56C10.52 18.18 11.33 15.82 12.13 13.46Z"
                    fill="currentColor"
                  />
                </svg>
                <h3>WordPress</h3>
              </div>
              <Button
                layer="background"
                onClick={() => setIsWordPressNavOpen(false)}
              >
                <Icon name="close" />
              </Button>
            </header>
            <div className="wordpress-nav-content col fill px-l py-xs">
              <p>WordPress Navigation (WIP)</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`stage fill ${
          isChatOpen || isWordPressNavOpen
            ? `m-s ${isChatOpen ? 'mr-0' : ''} ${isWordPressNavOpen ? 'ml-0' : ''} radius-l`
            : ''
        }`}
      >
        <div className="editor full-height">
          <EditorToolbar
            viewMode={viewMode}
            selectedPage={selectedPage || contextPages[0]}
            pages={contextPages}
            menuRef={menuRef}
            onPageSelect={handlePageSelect}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            onTogglePanel={togglePanel}
            onToggleChat={() => setIsChatOpen((prev) => !prev)}
            onToggleWordPressNav={() => setIsWordPressNavOpen((prev) => !prev)}
            onToggleViewMode={() => setViewMode(viewMode === 'grid' ? 'single' : 'grid')}
            isChatOpen={isChatOpen}
            isWordPressNavOpen={isWordPressNavOpen}
            openPanelId={getOpenPanelId()}
          />
          <div className="row editor-content">
            <AnimatePresence>
              {getOpenPanelAt('left') && (
                <motion.div
                  key="left-panel"
                  className={`panel ${
                    getOpenPanelAt('left') === 'structure'
                      ? 'panel-structure'
                      : 'panel-inserter'
                  }`}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 300, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  {getOpenPanelAt('left') === 'structure' ? (
                    <>
                      <h3>Structure</h3>
                      <StructurePanel
                        viewMode={viewMode}
                        selectedPage={selectedPage}
                        pages={contextPages}
                        onPageSelect={handleStructurePageSelect}
                        onBlockClick={handleBlockClick}
                        selectedBlockId={selectedBlockId}
                      />
                    </>
                  ) : (
                    <h3>Inserter</h3>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="editor-canvas fill">
              <PageView />
            </div>
            <AnimatePresence>
              {getOpenPanelAt('right') === 'settings' && (
                <motion.div
                  key="settings"
                  className="panel panel-settings"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 300, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <h3>Settings</h3>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="chat col"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
            }}
            style={{ overflow: 'hidden', minWidth: 0 }}
          >
            <header className="row items-center mt-s p-s pl-m">
              <div className="row items-center gap-xs full-height">
                <Icon name="chat" />
                <h3>Chat</h3>
              </div>
              <Button layer="background" onClick={() => setIsChatOpen(false)}>
                <Icon name="close" />
              </Button>
            </header>
            <div className="chat-messages col fill px-l py-xs">
              <div className="message">
                <p>
                  Hi there, I'm your AI-powered assistant. I can answer
                  questions and perform tasks to help you with your site.
                </p>
                <p>How can I help you today?</p>
              </div>
            </div>
            <footer className="p-s">
              <div className="chat-input">
                <div className="input-body p-s" contentEditable></div>
                <div className="input-actions row gap-xs p-xs">
                  <Button variant="primary" layer="background">
                    <Icon name="send" />
                  </Button>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <PageViewProvider initialPages={pages} initialPage={pages[0]}>
      <AppContent />
    </PageViewProvider>
  );
}

export default App;
