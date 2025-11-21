/**
 * Test helper utilities for component testing
 * 
 * These utilities help ensure all required props are provided in tests,
 * preventing TypeScript errors during build.
 */

import { vi } from 'vitest';

/**
 * Creates a mock function for use in tests
 * Alias for vi.fn() for consistency
 */
export const createMockFn = vi.fn;

/**
 * Validates that all required props are provided
 * This is a runtime check that complements TypeScript's compile-time checking
 * 
 * @param props - The props object to validate
 * @param requiredProps - Array of required prop names
 * @throws Error if any required props are missing
 */
export function validateRequiredProps<T extends Record<string, unknown>>(
  props: T,
  requiredProps: (keyof T)[]
): void {
  const missing = requiredProps.filter((prop) => !(prop in props));
  if (missing.length > 0) {
    throw new Error(
      `Missing required props: ${missing.join(', ')}. ` +
      'Ensure all required props from the component interface are provided in tests.'
    );
  }
}

/**
 * Helper to create a complete props object for EditorToolbar component
 * Use this as a base and override specific props as needed
 */
export function createEditorToolbarProps(overrides?: Partial<{
  viewMode: 'single' | 'grid';
  selectedPage: { id: string; label: string };
  pages: { id: string; label: string }[];
  menuRef: React.RefObject<any>;
  onPageSelect: (item: { id: string; label: string }) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onTogglePanel: (panelId: string) => void;
  onToggleChat: () => void;
  onToggleWordPressNav: () => void;
  isChatOpen: boolean;
  isWordPressNavOpen: boolean;
  openPanelId?: string | null;
}>) {
  const mockPages = [
    { id: '1', label: 'Page 1' },
    { id: '2', label: 'Page 2' },
  ];

  return {
    viewMode: 'single' as const,
    selectedPage: mockPages[0],
    pages: mockPages,
    menuRef: { current: null } as React.RefObject<any>,
    onPageSelect: createMockFn(),
    onPrevPage: createMockFn(),
    onNextPage: createMockFn(),
    onTogglePanel: createMockFn(),
    onToggleChat: createMockFn(),
    onToggleWordPressNav: createMockFn(),
    isChatOpen: false,
    isWordPressNavOpen: false,
    openPanelId: null,
    ...overrides,
  };
}

