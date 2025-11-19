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
            <div className="editor-toolbar-start row gap-xs">
              <Button className="button-wordpress">WordPress</Button>
              <Button>Add block</Button>
              <Button>Tools</Button>
              <Button>Undo</Button>
              <Button>Redo</Button>
              <Button>Layers</Button>
            </div>

            <div className="document-bar row gap-xxs">
              <Button className="button-prev">
                <Icon name="chevron-left-small" />
              </Button>
              <Menu items={mockPages} onItemSelect={handlePageSelect}>
                <Button align="center" className="button-document-picker">
                  <span className="document-title">{selectedPage.label}</span>
                  <small>⌘K</small>
                </Button>
              </Menu>
              <Button className="button-next">
                <Icon name="chevron-right-small" />
              </Button>
            </div>

            <div className="editor-toolbar-end row gap-xs pr-m">
              <Button>View: Desktop</Button>
              <Button>Styles</Button>
              <Button>Settings</Button>
              <Button>Save</Button>
              <Button>Options</Button>
            </div>
          </div>
          <div className="editor-canvas row gap-s wrap">
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
