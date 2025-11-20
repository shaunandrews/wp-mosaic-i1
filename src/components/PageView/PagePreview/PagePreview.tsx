import { useState, useEffect, useRef } from 'react';
import { PageContent } from '../../PageContent/PageContent';
import { type PageContent as PageContentType } from '../../../types/blocks';
import './PagePreview.css';

interface PagePreviewProps {
  content?: PageContentType;
  mode?: 'grid' | 'full';
  onLoad?: () => void;
}

const GRID_ITEM_WIDTH = 300;
const FULL_PAGE_WIDTH = 1200; // Approximate full page width
const SCALE_FACTOR = GRID_ITEM_WIDTH / FULL_PAGE_WIDTH;

export const PagePreview = ({
  content,
  mode = 'grid',
  onLoad,
}: PagePreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (content) {
      // Simulate loading time for preview rendering
      const timer = setTimeout(() => {
        setIsLoading(false);
        onLoad?.();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [content, onLoad]);

  useEffect(() => {
    if (mode !== 'grid' || isLoading || !contentRef.current) return;

    const updateHeight = () => {
      if (contentRef.current) {
        const scrollHeight = contentRef.current.scrollHeight;
        setContainerHeight(scrollHeight * SCALE_FACTOR);
      }
    };

    const observer = new ResizeObserver(updateHeight);
    observer.observe(contentRef.current);

    // Initial check
    updateHeight();

    return () => observer.disconnect();
  }, [mode, isLoading, content]);

  if (!content?.blocks || content.blocks.length === 0) {
    return null;
  }

  if (mode === 'grid') {
    return (
      <div
        className="page-preview page-preview--grid"
        style={{
          height: containerHeight,
          minHeight: isLoading ? 200 : undefined,
        }}
      >
        <div
          ref={contentRef}
          className="page-preview__content-wrapper"
          style={{
            transform: `scale(${SCALE_FACTOR})`,
            transformOrigin: 'top left',
            width: `${100 / SCALE_FACTOR}%`,
          }}
        >
          {isLoading ? (
            <div className="page-preview__loading">Loading...</div>
          ) : (
            <PageContent content={content} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page-preview page-preview--full">
      <PageContent content={content} />
    </div>
  );
};

