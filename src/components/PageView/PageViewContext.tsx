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

  const value: PageViewContextValue = {
    viewMode,
    selectedPage,
    direction,
    transitionSource,
    pages,
    setViewMode,
    selectPage,
    setPages,
  };

  return (
    <PageViewContext.Provider value={value}>{children}</PageViewContext.Provider>
  );
};

