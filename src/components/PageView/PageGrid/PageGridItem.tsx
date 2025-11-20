import { memo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PagePreview } from '../PagePreview/PagePreview';
import { PageErrorBoundary } from '../PageErrorBoundary';
import { type Page } from '../PageViewContext';
import './PageGridItem.css';

interface PageGridItemProps {
  page: Page;
  onClick: () => void;
  isVisible?: boolean;
}

export const PageGridItem = memo(
  ({ page, onClick, isVisible = true }: PageGridItemProps) => {
    const hasContent = page.content?.blocks && page.content.blocks.length > 0;
    const [lastHeight, setLastHeight] = useState<number | undefined>(undefined);
    const itemRef = useRef<HTMLDivElement>(null);

    // Capture height when visible to use as placeholder when hidden
    useEffect(() => {
      if (!itemRef.current) return;

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.height > 0) {
            setLastHeight(entry.contentRect.height);
          }
        }
      });

      observer.observe(itemRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <motion.div
        ref={itemRef}
        layoutId={`document-${page.id}`}
        className="page-grid-item"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        style={{ minHeight: !isVisible ? lastHeight : undefined }}
      >
        {isVisible ? (
          hasContent ? (
            <PageErrorBoundary
              fallback={
                <div className="page-grid-item__error">
                  <span className="page-grid-item__label">{page.label}</span>
                </div>
              }
            >
              <div className="page-grid-item__preview-wrapper">
                <div className="page-grid-item__preview">
                  <PagePreview content={page.content} mode="grid" />
                </div>
              </div>
            </PageErrorBoundary>
          ) : (
            <div className="page-grid-item__empty">
              <span className="page-grid-item__label">{page.label}</span>
            </div>
          )
        ) : (
          <div style={{ height: lastHeight || 200 }} />
        )}
      </motion.div>
    );
  }
);

PageGridItem.displayName = 'PageGridItem';
