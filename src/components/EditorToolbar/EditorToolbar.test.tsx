import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditorToolbar } from './EditorToolbar';
import { type MenuHandle } from '../Menu/Menu';

const mockPages = [
  { id: '1', label: 'Page 1' },
  { id: '2', label: 'Page 2' },
];

const mockMenuRef = {
  current: null,
} as React.RefObject<MenuHandle | null>;

describe('EditorToolbar', () => {
  it('calls onTogglePanel with "structure" when list button is clicked', async () => {
    const user = userEvent.setup();
    const onTogglePanel = vi.fn();

    const { container } = render(
      <EditorToolbar
        viewMode="single"
        selectedPage={mockPages[0]}
        pages={mockPages}
        menuRef={mockMenuRef}
        onPageSelect={vi.fn()}
        onPrevPage={vi.fn()}
        onNextPage={vi.fn()}
        onTogglePanel={onTogglePanel}
      />
    );

    // Find the list button - it's in the editor-toolbar-start section
    // We can find it by looking for buttons in that section
    const toolbarStart = container.querySelector('.editor-toolbar-start');
    expect(toolbarStart).toBeInTheDocument();
    
    const buttons = toolbarStart?.querySelectorAll('button') || [];
    // List button is the second button (after WordPress logo button)
    const listButton = buttons[1] as HTMLButtonElement;
    expect(listButton).toBeInTheDocument();

    await user.click(listButton);

    expect(onTogglePanel).toHaveBeenCalledWith('structure');
    expect(onTogglePanel).toHaveBeenCalledTimes(1);
  });

  it('calls onTogglePanel with "settings" when drawer-right button is clicked', async () => {
    const user = userEvent.setup();
    const onTogglePanel = vi.fn();

    const { container } = render(
      <EditorToolbar
        viewMode="single"
        selectedPage={mockPages[0]}
        pages={mockPages}
        menuRef={mockMenuRef}
        onPageSelect={vi.fn()}
        onPrevPage={vi.fn()}
        onNextPage={vi.fn()}
        onTogglePanel={onTogglePanel}
      />
    );

    // Find the drawer-right button - it's in the editor-toolbar-end section
    const toolbarEnd = container.querySelector('.editor-toolbar-end');
    expect(toolbarEnd).toBeInTheDocument();
    
    const buttons = toolbarEnd?.querySelectorAll('button') || [];
    // Drawer-right button is the second button (after view-desktop, before Save)
    const drawerRightButton = buttons[1] as HTMLButtonElement;
    expect(drawerRightButton).toBeInTheDocument();

    await user.click(drawerRightButton);

    expect(onTogglePanel).toHaveBeenCalledWith('settings');
    expect(onTogglePanel).toHaveBeenCalledTimes(1);
  });
});

