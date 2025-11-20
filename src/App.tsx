import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import { type MenuHandle } from './components/Menu/Menu';
import { EditorToolbar } from './components/EditorToolbar/EditorToolbar';
import { Button } from './components/Button/Button';
import { Icon } from './components/Icon/Icon';
import { PageViewProvider, type Page } from './components/PageView/PageViewContext';
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
    setViewMode,
    selectPage,
    navigatePrev,
    navigateNext,
  } = usePageView();
  const [panelState, setPanelState] = useState<PanelState>({
    left: null,
    right: null,
  });
  const [isChatOpen, setIsChatOpen] = useState(() => {
    const saved = localStorage.getItem('chatOpen');
    return saved !== null ? saved === 'true' : true;
  });
  const menuRef = useRef<MenuHandle>(null);

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

  const handleActionSelect = (action: { id: string; label: string }) => {
    // TODO: Implement action handlers
    console.log('Action selected:', action);
    // Example actions:
    // - rename-page: Open rename dialog
    // - duplicate: Duplicate the current page
    // - add-before: Add a new page before the current page
    // - add-after: Add a new page after the current page
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
      <div className={`stage fill ${isChatOpen ? 'm-s mr-0 radius-l' : ''}`}>
        <div className="editor full-height">
          <EditorToolbar
            viewMode={viewMode}
            selectedPage={selectedPage || contextPages[0]}
            pages={contextPages}
            menuRef={menuRef}
            onPageSelect={handlePageSelect}
            onActionSelect={handleActionSelect}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            onTogglePanel={togglePanel}
            onToggleChat={() => setIsChatOpen((prev) => !prev)}
            isChatOpen={isChatOpen}
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
                <p>Hi there, I'm your AI-powered assistant. I can answer questions and perform tasks to help you with your site.</p>
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
