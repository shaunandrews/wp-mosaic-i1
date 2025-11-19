import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock the pages data
vi.mock('./data/pages.json', () => ({
  default: {
    pages: [
      { id: '1', label: 'Page 1' },
      { id: '2', label: 'Page 2' },
    ],
  },
}));

describe('App Panel System', () => {
  beforeEach(() => {
    // Clear body before each test
    document.body.innerHTML = '';
  });

  it('renders with both panels closed by default', () => {
    render(<App />);

    // Structure panel should not be visible
    expect(screen.queryByText('Structure')).not.toBeInTheDocument();
    // Settings panel should not be visible
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  it('opens structure panel when list button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Find and click the list button
    const buttons = screen.getAllByRole('button');
    // List button is the second button (after WordPress logo)
    const listButton = buttons[1];

    await user.click(listButton);

    // Structure panel should now be visible
    expect(screen.getByText('Structure')).toBeInTheDocument();
  });

  it('closes structure panel when list button is clicked again', async () => {
    const user = userEvent.setup();
    render(<App />);

    const buttons = screen.getAllByRole('button');
    const listButton = buttons[1];

    // Open panel
    await user.click(listButton);
    expect(screen.getByText('Structure')).toBeInTheDocument();

    // Close panel
    await user.click(listButton);
    expect(screen.queryByText('Structure')).not.toBeInTheDocument();
  });

  it('opens settings panel when drawer-right button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Find the drawer-right button (before Save button)
    const saveButton = screen.getByRole('button', { name: 'Save' });
    const allButtons = screen.getAllByRole('button');
    const saveButtonIndex = allButtons.indexOf(saveButton);
    const drawerRightButton = allButtons[saveButtonIndex - 1];

    await user.click(drawerRightButton);

    // Settings panel should now be visible
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('closes settings panel when drawer-right button is clicked again', async () => {
    const user = userEvent.setup();
    render(<App />);

    const saveButton = screen.getByRole('button', { name: 'Save' });
    const allButtons = screen.getAllByRole('button');
    const saveButtonIndex = allButtons.indexOf(saveButton);
    const drawerRightButton = allButtons[saveButtonIndex - 1];

    // Open panel
    await user.click(drawerRightButton);
    expect(screen.getByText('Settings')).toBeInTheDocument();

    // Close panel
    await user.click(drawerRightButton);
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  it('can have both panels open simultaneously', async () => {
    const user = userEvent.setup();
    render(<App />);

    const buttons = screen.getAllByRole('button');
    const listButton = buttons[1];
    const saveButton = screen.getByRole('button', { name: 'Save' });
    const allButtons = screen.getAllByRole('button');
    const saveButtonIndex = allButtons.indexOf(saveButton);
    const drawerRightButton = allButtons[saveButtonIndex - 1];

    // Open both panels
    await user.click(listButton);
    await user.click(drawerRightButton);

    // Both panels should be visible
    expect(screen.getByText('Structure')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders editor canvas with fill class for flexbox layout', () => {
    render(<App />);

    const canvas = document.querySelector('.editor-canvas.fill');
    expect(canvas).toBeInTheDocument();
  });

  it('renders editor-content container with proper height', () => {
    render(<App />);

    const contentContainer = document.querySelector('.editor-content');
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveClass('row');
  });
});

