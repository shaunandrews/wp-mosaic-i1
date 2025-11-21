import { motion, AnimatePresence } from 'framer-motion';
import { usePageView } from '../usePageView';
import { PagePreview } from '../PagePreview/PagePreview';
import { PageErrorBoundary } from '../PageErrorBoundary';
import './PageSingle.css';

export const PageSingle = () => {
  const { selectedPage, direction, transitionSource, selectedBlockId, selectBlock } = usePageView();

  const handleBlockClick = (blockId: string) => {
    // Toggle selection: if clicking the same block, deselect it
    if (selectedBlockId === blockId) {
      selectBlock(null);
    } else {
      selectBlock(blockId);
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    // Only deselect if clicking directly on the page-content container
    // (not on a block, which will have stopped propagation)
    if (e.target === e.currentTarget) {
      selectBlock(null);
    }
  };

  if (!selectedPage) {
    return null;
  }

  const shouldSlide = transitionSource === 'navigation';
  const hasContent =
    selectedPage.content?.blocks && selectedPage.content.blocks.length > 0;

  if (shouldSlide) {
    // Slide animation for prev/next navigation
    return (
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={selectedPage.id}
          layoutId={`document-${selectedPage.id}`}
          className="page-single"
          custom={direction}
          variants={{
            enter: (dir: 'left' | 'right') => ({
              x: dir === 'right' ? '100%' : '-100%',
              opacity: 0,
            }),
            center: {
              x: 0,
              opacity: 1,
            },
            exit: (dir: 'left' | 'right') => ({
              x: dir === 'right' ? '-100%' : '100%',
              opacity: 0,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          layout={false} // Disable layout animation during slide
        >
          {hasContent ? (
            <PageErrorBoundary
              fallback={
                <div className="page-single__error">
                  <p>{selectedPage.label}</p>
                  <p>Failed to render content</p>
                </div>
              }
            >
              <PagePreview 
                content={selectedPage.content} 
                mode="full" 
                onBlockClick={handleBlockClick}
                selectedBlockId={selectedBlockId}
                onContentClick={handleContentClick}
              />
            </PageErrorBoundary>
          ) : (
            <div className="page-single__empty">
              <p>{selectedPage.label}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  }

  // Zoom animation for grid/menu transitions (no slide)
  return (
    <motion.div
      key={selectedPage.id}
      layoutId={`document-${selectedPage.id}`}
      className="page-single"
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {hasContent ? (
        <PageErrorBoundary
          fallback={
            <div className="page-single__error">
              <p>{selectedPage.label}</p>
              <p>Failed to render content</p>
            </div>
          }
        >
          <PagePreview 
            content={selectedPage.content} 
            mode="full" 
            onBlockClick={handleBlockClick}
            selectedBlockId={selectedBlockId}
            onContentClick={handleContentClick}
          />
        </PageErrorBoundary>
      ) : (
        <div className="page-single__empty">
          <p>{selectedPage.label}</p>
        </div>
      )}
    </motion.div>
  );
};

