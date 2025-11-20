import { createContext, useState, useCallback, type ReactNode } from 'react';
import { type PageContent as PageContentType } from '../../types/blocks';

export interface Page {
  id: string;
  label: string;
  content?: PageContentType;
}

export type ViewMode = 'single' | 'grid';
export type Direction = 'left' | 'right';
export type TransitionSource = 'grid' | 'menu' | 'navigation';

interface PageViewContextValue {
  viewMode: ViewMode;
  selectedPage: Page | null;
  direction: Direction;
  transitionSource: TransitionSource;
  pages: Page[];
  setViewMode: (mode: ViewMode) => void;
  selectPage: (page: Page, source?: TransitionSource) => void;
  navigatePrev: () => void;
  navigateNext: () => void;
  setPages: (pages: Page[]) => void;
}

export const PageViewContext = createContext<PageViewContextValue | undefined>(undefined);

interface PageViewProviderProps {
  children: ReactNode;
  initialPages: Page[];
  initialPage?: Page;
}

export const PageViewProvider = ({
  children,
  initialPages,
  initialPage,
}: PageViewProviderProps) => {
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedPage, setSelectedPage] = useState<Page | null>(
    initialPage || initialPages[0] || null
  );
  const [direction, setDirection] = useState<Direction>('right');
  const [transitionSource, setTransitionSource] = useState<TransitionSource>('menu');

  const selectPage = useCallback((page: Page, source: TransitionSource = 'menu') => {
    setSelectedPage(page);
    setTransitionSource(source);
    setViewMode('single');
  }, []);

  const navigatePrev = useCallback(() => {
    if (!selectedPage) return;
    setDirection('left');
    setTransitionSource('navigation');
    const currentIndex = pages.findIndex((page) => page.id === selectedPage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
    setSelectedPage(pages[prevIndex] || null);
  }, [selectedPage, pages]);

  const navigateNext = useCallback(() => {
    if (!selectedPage) return;
    setDirection('right');
    setTransitionSource('navigation');
    const currentIndex = pages.findIndex((page) => page.id === selectedPage.id);
    const nextIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
    setSelectedPage(pages[nextIndex] || null);
  }, [selectedPage, pages]);

  const value: PageViewContextValue = {
    viewMode,
    selectedPage,
    direction,
    transitionSource,
    pages,
    setViewMode,
    selectPage,
    navigatePrev,
    navigateNext,
    setPages,
  };

  return (
    <PageViewContext.Provider value={value}>{children}</PageViewContext.Provider>
  );
};

