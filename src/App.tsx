import './App.css';

function App() {
  return (
    <div className="app row">
      <div className="stage fill">
        <div className="editor full-height">
          <div className="editor-toolbar row items-center justify-between">
            <div className="editor-toolbar-start row gap-xs">
              <button className="button-wordpress">WordPress</button>
              <button>Add block</button>
              <button>Tools</button>
              <button>Undo</button>
              <button>Redo</button>
              <button>Layers</button>
            </div>

            <div className="document-bar row gap-s">
              <button>Prev</button>
              <button className="row">
                <span>Home</span>
                <span>Page</span>
              </button>
              <small>⌘K</small>
              <button>Next</button>
            </div>

            <div className="editor-toolbar-end row gap-xs pr-m">
              <button>View: Desktop</button>
              <button>Styles</button>
              <button>Settings</button>
              <button>Save</button>
              <button>Options</button>
            </div>
          </div>
        </div>
      </div>
      <div className="chat p-m">
        <span>Chat</span>
      </div>
    </div>
  );
}

export default App;
