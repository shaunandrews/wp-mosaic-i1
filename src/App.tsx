import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import { type MenuHandle } from './components/Menu/Menu';
import { EditorToolbar } from './components/EditorToolbar/EditorToolbar';
import { Button } from './components/Button/Button';
import { Icon } from './components/Icon/Icon';
import { PageContent } from './components/PageContent/PageContent';
import pagesData from './data/pages.json';
import { type PageContent as PageContentType } from './types/blocks';

const pages = pagesData.pages as Page[];

interface Page {
  id: string;
  label: string;
  content?: PageContentType;
}

type ViewMode = 'single' | 'grid';
type Direction = 'left' | 'right';
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

function App() {
  const [selectedPage, setSelectedPage] = useState<Page>(pages[0] as Page);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [direction, setDirection] = useState<Direction>('right');
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [panelState, setPanelState] = useState<PanelState>({
    left: null,
    right: null,
  });
  const [isChatOpen, setIsChatOpen] = useState(true);
  const menuRef = useRef<MenuHandle>(null);

  const getOpenPanelAt = (position: PanelPosition): string | null => {
    return panelState[position];
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
      setShouldAnimate(false);
      const page = pages.find((p) => p.id === item.id) as Page;
      setSelectedPage(page || (item as Page));
      setViewMode('single');
    }
  };

  const handlePrevPage = () => {
    setDirection('left');
    setShouldAnimate(true);
    const currentIndex = pages.findIndex((page) => page.id === selectedPage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
    setSelectedPage(pages[prevIndex] as Page);
  };

  const handleNextPage = () => {
    setDirection('right');
    setShouldAnimate(true);
    const currentIndex = pages.findIndex((page) => page.id === selectedPage.id);
    const nextIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
    setSelectedPage(pages[nextIndex] as Page);
  };

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
          setShouldAnimate(false);
          setViewMode('single');
        } else {
          setViewMode('grid');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [viewMode]);

  return (
    <div className="app row">
      <div className={`stage fill ${isChatOpen ? 'm-s mr-0 radius-l' : ''}`}>
        <div className="editor full-height">
          <EditorToolbar
            viewMode={viewMode}
            selectedPage={selectedPage}
            pages={pages}
            menuRef={menuRef}
            onPageSelect={handlePageSelect}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            onTogglePanel={togglePanel}
            onToggleChat={() => setIsChatOpen((prev) => !prev)}
            isChatOpen={isChatOpen}
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
                    <h3>Structure</h3>
                  ) : (
                    <h3>Inserter</h3>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <div
              className={`editor-canvas fill ${viewMode === 'single' ? 'view-single' : 'view-grid'}`}
            >
              {viewMode === 'single' ? (
                shouldAnimate ? (
                  <AnimatePresence custom={direction}>
                    <motion.div
                      key={selectedPage.id}
                      layoutId={`document-${selectedPage.id}`}
                      className="document document-single"
                      custom={direction}
                      variants={{
                        enter: (dir: Direction) => ({
                          x: dir === 'right' ? '100%' : '-100%',
                          opacity: 0,
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                        },
                        exit: (dir: Direction) => ({
                          x: dir === 'right' ? '-100%' : '100%',
                          opacity: 0,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {selectedPage.content ? (
                        <PageContent content={selectedPage.content} />
                      ) : (
                        selectedPage.label
                      )}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div
                    key={selectedPage.id}
                    className="document document-single"
                  >
                    {selectedPage.content ? (
                      <PageContent content={selectedPage.content} />
                    ) : (
                      selectedPage.label
                    )}
                  </div>
                )
              ) : (
                <motion.div
                  className="editor-canvas-grid row wrap gap-l p-l"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {pages.map((page) => (
                    <motion.div
                      key={page.id}
                      layoutId={`document-${page.id}`}
                      className="document document-grid"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      onClick={() => {
                        setSelectedPage(page);
                        setViewMode('single');
                      }}
                      style={{ cursor: 'pointer' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {(page as Page).content ? (
                        <div className="document-preview">
                          <PageContent content={(page as Page).content} />
                        </div>
                      ) : (
                        page.label
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
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

export default App;
