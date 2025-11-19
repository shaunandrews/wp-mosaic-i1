import { type MenuHandle } from '../Menu/Menu';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { DocumentBar } from '../DocumentBar/DocumentBar';
import './EditorToolbar.css';

type ViewMode = 'single' | 'grid';

interface Page {
  id: string;
  label: string;
}

interface EditorToolbarProps {
  viewMode: ViewMode;
  selectedPage: Page;
  pages: Page[];
  menuRef: React.RefObject<MenuHandle | null>;
  onPageSelect: (item: { id: string; label: string }) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onTogglePanel: (panelId: string) => void;
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
}: EditorToolbarProps) => {
  return (
    <div className="editor-toolbar row items-center justify-between">
      <div className="editor-toolbar-start row gap-xs items-center">
        <Button className="button-wordpress">
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
        </Button>

        <Button onClick={() => onTogglePanel('structure')}>
          <Icon name="list" />
        </Button>
        <Button variant="primary" onClick={() => onTogglePanel('inserter')}>
          <Icon name="plus" />
        </Button>
        <Button>
          <Icon name="undo" />
        </Button>
        <Button>
          <Icon name="redo" />
        </Button>
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
        <Button onClick={() => onTogglePanel('settings')}>
          <Icon name="drawer-right" />
        </Button>
        <Button variant="primary" align="center" className="button-save">
          Save
        </Button>
        <Button>
          <Icon name="more" />
        </Button>
      </div>
    </div>
  );
};
