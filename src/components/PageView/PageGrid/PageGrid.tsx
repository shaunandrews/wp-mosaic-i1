import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePageView } from '../usePageView';
import { PageGridItem } from './PageGridItem';
import './PageGrid.css';

const BUFFER_SIZE = 4; // Render buffer around visible area

export const PageGrid = () => {
  const { pages, selectPage, selectedPage, deselectPage } = usePageView();
  const containerRef = useRef<HTMLDivElement>(null);
  // Initial visible set (first few items)
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(
    () => new Set(Array.from({ length: 12 }, (_, i) => i))
  );

  // Use Intersection Observer to track visibility
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIndices((prevIndices) => {
          const newIndices = new Set(prevIndices);
          let hasChanges = false;

          entries.forEach((entry) => {
            const index = parseInt(
              entry.target.getAttribute('data-index') || '-1',
              10
            );
            if (index === -1) return;

            if (entry.isIntersecting) {
              // Add visible item and buffer
              for (let i = index - BUFFER_SIZE; i <= index + BUFFER_SIZE; i++) {
                if (i >= 0 && i < pages.length && !newIndices.has(i)) {
                  newIndices.add(i);
                  hasChanges = true;
                }
              }
            }
          });

          return hasChanges ? newIndices : prevIndices;
        });
      },
      {
        root: container,
        rootMargin: '600px', // Large pre-load buffer
        threshold: 0,
      }
    );

    // Observe all item wrappers
    // Note: This approach creates an observer for every item.
    // For very large lists (1000+), virtualizing the wrappers themselves is needed.
    // For < 100 items, this is fine and stable.
    const items = container.querySelectorAll('[data-index]');
    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, [pages.length]);

  const handleItemClick = (pageId: string) => {
    const page = pages.find((p) => p.id === pageId);
    if (page) {
      selectPage(page, 'grid', false);
    }
  };

  const handleItemDoubleClick = (pageId: string) => {
    const page = pages.find((p) => p.id === pageId);
    if (page) {
      selectPage(page, 'grid');
    }
  };

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only deselect if clicking directly on the grid container (whitespace)
    // and not on a grid item
    if (
      e.target === e.currentTarget ||
      (e.target as HTMLElement).classList.contains('page-grid-content')
    ) {
      deselectPage();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="page-grid px-xl py-xl pt-m"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={handleGridClick}
    >
      <div className="page-grid-content">
        {pages.map((page, index) => {
          const isSelected = selectedPage?.id === page.id;
          return (
            <PageGridItem
              key={page.id}
              data-index={index}
              page={page}
              onClick={() => handleItemClick(page.id)}
              onDoubleClick={() => handleItemDoubleClick(page.id)}
              isVisible={visibleIndices.has(index)}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </motion.div>
  );
};
