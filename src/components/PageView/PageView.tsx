import { AnimatePresence } from 'framer-motion';
import { usePageView } from './usePageView';
import { PageGrid } from './PageGrid/PageGrid';
import { PageSingle } from './PageSingle/PageSingle';
import './PageView.css';

export const PageView = () => {
  const { viewMode } = usePageView();

  return (
    <div className={`page-view ${viewMode === 'single' ? 'page-view--single' : 'page-view--grid'}`}>
      <AnimatePresence>
        {viewMode === 'grid' ? (
          <PageGrid key="grid" />
        ) : (
          <PageSingle key="single" />
        )}
      </AnimatePresence>
    </div>
  );
};

