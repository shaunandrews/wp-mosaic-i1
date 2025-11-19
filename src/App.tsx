import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import { Menu } from './components/Menu/Menu';
import { Icon } from './components/Icon/Icon';
import { Button } from './components/Button/Button';
import pagesData from './data/pages.json';

const pages = pagesData.pages;

type ViewMode = 'single' | 'grid';

function App() {
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const handlePageSelect = (item: { id: string; label: string }) => {
    setSelectedPage(item);
  };

  const handlePrevPage = () => {
    const currentIndex = pages.findIndex((page) => page.id === selectedPage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
    setSelectedPage(pages[prevIndex]);
  };

  const handleNextPage = () => {
    const currentIndex = pages.findIndex((page) => page.id === selectedPage.id);
    const nextIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
    setSelectedPage(pages[nextIndex]);
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === 'single' ? 'grid' : 'single'));
  };

  return (
    <div className="app row">
      <div className="stage fill m-s mr-0 radius-l">
        <div className="editor full-height">
          <div className="editor-toolbar row items-center justify-between">
            <div className="editor-toolbar-start row gap-xs items-center">
              <Button className="button-wordpress">WordPress</Button>

              <Button>
                <Icon name="list" />
              </Button>
              <Button
                onClick={handleToggleViewMode}
                title={viewMode === 'single' ? 'Grid View' : 'Single View'}
              >
                {viewMode === 'single' ? 'Grid' : 'Single'}
              </Button>
              <Button type="primary">
                <Icon name="plus" />
              </Button>
              <Button>
                <Icon name="undo" />
              </Button>
              <Button>
                <Icon name="redo" />
              </Button>
            </div>

            <div className="document-bar row gap-xs">
              <Button className="button-prev" onClick={handlePrevPage}>
                <Icon name="chevron-left-small" />
              </Button>
              <Menu items={pages} onItemSelect={handlePageSelect}>
                <Button align="center" className="button-document-picker">
                  <span className="title-wrapper row items-center">
                    <span className="document-title">{selectedPage.label}</span>
                    <Icon name="chevron-down-small" />
                  </span>
                  <small>⌘K</small>
                </Button>
              </Menu>
              <Button className="button-next" onClick={handleNextPage}>
                <Icon name="chevron-right-small" />
              </Button>
            </div>

            <div className="editor-toolbar-end row gap-xs pr-s">
              <Button>
                <Icon name="view-desktop" />
              </Button>
              <Button>
                <Icon name="drawer-right" />
              </Button>
              <Button type="primary" align="center" className="button-save">
                Save
              </Button>
              <Button>
                <Icon name="more" />
              </Button>
            </div>
          </div>
          <div className={`editor-canvas ${viewMode === 'single' ? 'view-single' : 'view-grid'}`}>
            {viewMode === 'single' ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPage.id}
                  layoutId={`document-${selectedPage.id}`}
                  className="document document-single"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  {selectedPage.label}
                </motion.div>
              </AnimatePresence>
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
                    {page.label}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className="chat p-s">
        <span>Chat</span>
      </div>
    </div>
  );
}

export default App;
