import { useState } from 'react';
import './App.css';
import { Menu } from './components/Menu/Menu';
import { Icon } from './components/Icon/Icon';
import { Button } from './components/Button/Button';

const mockPages = [
  { id: '1', label: 'Home' },
  { id: '2', label: 'About' },
  { id: '3', label: 'Contact' },
  { id: '4', label: 'Blog' },
  { id: '5', label: 'Services' },
  { id: '6', label: 'Portfolio' },
];

function App() {
  const [selectedPage, setSelectedPage] = useState(mockPages[0]);

  const handlePageSelect = (item: { id: string; label: string }) => {
    setSelectedPage(item);
  };

  return (
    <div className="app row">
      <div className="stage fill m-s mr-0 radius-l">
        <div className="editor full-height">
          <div className="editor-toolbar row items-center justify-between">
            <div className="editor-toolbar-start row gap-xxs">
              <Button className="button-wordpress">WordPress</Button>
              <Button>
                <Icon name="plus" />
              </Button>
              <Button>
                <Icon name="undo" />
              </Button>
              <Button>
                <Icon name="redo" />
              </Button>
              <Button>
                <Icon name="list" />
              </Button>
            </div>

            <div className="document-bar row gap-xxs">
              <Button className="button-prev">
                <Icon name="chevron-left-small" />
              </Button>
              <Menu items={mockPages} onItemSelect={handlePageSelect}>
                <Button align="center" className="button-document-picker">
                  <span className="title-wrapper row items-center">
                    <span className="document-title">{selectedPage.label}</span>
                    <Icon name="chevron-down-small" />
                  </span>
                  <small>⌘K</small>
                </Button>
              </Menu>
              <Button className="button-next">
                <Icon name="chevron-right-small" />
              </Button>
            </div>

            <div className="editor-toolbar-end row gap-xxs pr-xs">
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
