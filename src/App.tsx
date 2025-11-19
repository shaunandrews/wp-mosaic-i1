import { useState } from 'react';
import './App.css';
import { Menu } from './components/Menu/Menu';
import { Icon } from './components/Icon/Icon';
import { Button } from './components/Button/Button';
import pagesData from './data/pages.json';

const pages = pagesData.pages;

function App() {
  const [selectedPage, setSelectedPage] = useState(pages[0]);

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
          <div className="editor-canvas p-l gap-l row wrap">
            <div className="document">document 1</div>
            <div className="document">document 2</div>
            <div className="document">document 3</div>
            <div className="document">document 4</div>
            <div className="document">document 5</div>
            <div className="document">document 6</div>
            <div className="document">document 7</div>
            <div className="document">document 8</div>
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
