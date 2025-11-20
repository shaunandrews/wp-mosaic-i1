import { useContext } from 'react';
import { PageViewContext } from './PageViewContext';

export const usePageView = () => {
  const context = useContext(PageViewContext);
  if (context === undefined) {
    throw new Error('usePageView must be used within a PageViewProvider');
  }
  return context;
};

