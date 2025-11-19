import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { Menu, type MenuHandle } from './Menu';
import { Button } from '../Button/Button';

// Mock data for testing
const mockGroups = [
  {
    items: [
      { id: '1', label: 'Home' },
      { id: '2', label: 'About' },
      { id: '3', label: 'Contact' },
    ],
  },
  {
    items: [{ id: 'view-all-pages', label: 'View all pages' }],
  },
];

describe('Menu', () => {
  beforeEach(() => {
    // Clear any existing portals
    document.body.innerHTML = '';
  });

  it('renders the menu trigger button', () => {
    render(
      <Menu groups={mockGroups}>
        <Button>Open Menu</Button>
      </Menu>
    );

    expect(screen.getByRole('button', { name: 'Open Menu' })).toBeInTheDocument();
  });

  it('opens menu when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Menu groups={mockGroups}>
        <Button>Open Menu</Button>
      </Menu>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Pages, posts, settings/i)).toBeInTheDocument();
    });
  });

  it('focuses the selected item when menu is opened via click', async () => {
    const user = userEvent.setup();
    const onItemSelect = vi.fn();

    render(
      <Menu groups={mockGroups} selectedItemId="2" onItemSelect={onItemSelect}>
        <Button>Open Menu</Button>
      </Menu>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      const menuItems = screen.getAllByRole('button', { name: /Home|About|Contact|View all pages/i });
      // The selected item (About) should be focused
      const aboutButton = menuItems.find((btn) => btn.textContent?.includes('About'));
      expect(aboutButton).toHaveFocus();
    });
  });

  it('focuses the first item when menu is opened via click with no selected item', async () => {
    const user = userEvent.setup();

    render(
      <Menu groups={mockGroups}>
        <Button>Open Menu</Button>
      </Menu>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      const menuItems = screen.getAllByRole('button', { name: /Home|About|Contact|View all pages/i });
      // The first item (Home) should be focused
      const homeButton = menuItems.find((btn) => btn.textContent?.includes('Home'));
      expect(homeButton).toHaveFocus();
    });
  });

  it('focuses the search input when menu is opened via ref.open(true)', async () => {
    const TestComponent = () => {
      const menuRef = useRef<MenuHandle>(null);

      const handleKeyPress = () => {
        menuRef.current?.open(true);
      };

      return (
        <>
          <button onClick={handleKeyPress}>Simulate Cmd-K</button>
          <Menu ref={menuRef} groups={mockGroups}>
            <Button>Open Menu</Button>
          </Menu>
        </>
      );
    };

    const user = userEvent.setup();
    render(<TestComponent />);

    const simulateCmdK = screen.getByRole('button', { name: 'Simulate Cmd-K' });
    await user.click(simulateCmdK);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/Pages, posts, settings/i);
      expect(searchInput).toHaveFocus();
    });
  });

  it('does not focus search input when menu is opened via click', async () => {
    const user = userEvent.setup();

    render(
      <Menu groups={mockGroups} selectedItemId="1">
        <Button>Open Menu</Button>
      </Menu>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/Pages, posts, settings/i);
      // Search input should NOT be focused when opened via click
      expect(searchInput).not.toHaveFocus();
    });
  });

  it('calls onItemSelect when a menu item is clicked', async () => {
    const user = userEvent.setup();
    const onItemSelect = vi.fn();

    render(
      <Menu groups={mockGroups} onItemSelect={onItemSelect}>
        <Button>Open Menu</Button>
      </Menu>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Pages, posts, settings/i)).toBeInTheDocument();
    });

    const aboutButton = screen.getByRole('button', { name: /About/i });
    await user.click(aboutButton);

    expect(onItemSelect).toHaveBeenCalledWith({ id: '2', label: 'About' });
  });

  it('closes menu after item selection', async () => {
    const user = userEvent.setup();
    const onItemSelect = vi.fn();

    render(
      <Menu groups={mockGroups} onItemSelect={onItemSelect}>
        <Button>Open Menu</Button>
      </Menu>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Pages, posts, settings/i)).toBeInTheDocument();
    });

    const aboutButton = screen.getByRole('button', { name: /About/i });
    await user.click(aboutButton);

    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/Pages, posts, settings/i)).not.toBeInTheDocument();
    });
  });

  it('renders search input with correct placeholder', async () => {
    const user = userEvent.setup();

    render(
      <Menu groups={mockGroups}>
        <Button>Open Menu</Button>
      </Menu>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/Pages, posts, settings/i);
      expect(searchInput).toBeInTheDocument();
    });
  });

  it('allows typing in search input without triggering menu navigation', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const menuRef = useRef<MenuHandle>(null);

      const handleKeyPress = () => {
        menuRef.current?.open(true);
      };

      return (
        <>
          <button onClick={handleKeyPress}>Simulate Cmd-K</button>
          <Menu ref={menuRef} groups={mockGroups}>
            <Button>Open Menu</Button>
          </Menu>
        </>
      );
    };

    render(<TestComponent />);

    const simulateCmdK = screen.getByRole('button', { name: 'Simulate Cmd-K' });
    await user.click(simulateCmdK);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/Pages, posts, settings/i);
      expect(searchInput).toHaveFocus();
    });

    const searchInput = screen.getByPlaceholderText(/Pages, posts, settings/i);
    await user.type(searchInput, 'test search');

    // Input should still have focus and contain the typed text
    expect(searchInput).toHaveFocus();
    expect(searchInput).toHaveValue('test search');
  });
});

