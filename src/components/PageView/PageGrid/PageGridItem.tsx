import { memo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PagePreview } from '../PagePreview/PagePreview';
import { PageErrorBoundary } from '../PageErrorBoundary';
import { type Page } from '../PageViewContext';
import './PageGridItem.css';

interface PageGridItemProps {
  page: Page;
  onClick: () => void;
  onDoubleClick?: () => void;
  isVisible?: boolean;
  isSelected?: boolean;
  'data-index'?: number;
}

export const PageGridItem = memo(
  ({
    page,
    onClick,
    onDoubleClick,
    isVisible = true,
    isSelected = false,
    'data-index': dataIndex,
  }: PageGridItemProps) => {
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
        data-index={dataIndex}
        layoutId={`document-${page.id}`}
        className={`page-grid-item col gap-xxs ${isSelected ? 'is-selected' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          onDoubleClick?.();
        }}
        style={{ minHeight: !isVisible ? lastHeight : undefined }}
      >
        <div className="page-grid-item__title">{page.label}</div>
        {isVisible ? (
          hasContent ? (
            <div className="page-grid-item__preview-wrapper">
              <PageErrorBoundary
                fallback={
                  <div className="page-grid-item__error">{page.label}</div>
                }
              >
                <PagePreview content={page.content} mode="grid" />
              </PageErrorBoundary>
            </div>
          ) : (
            <div className="page-grid-item__empty">{page.label}</div>
          )
        ) : null}
      </motion.div>
    );
  }
);

PageGridItem.displayName = 'PageGridItem';
