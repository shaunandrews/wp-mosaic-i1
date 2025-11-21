import { type Block } from '../../types/blocks';
import { type Page } from '../PageView/PageViewContext';
import { type ViewMode } from '../PageView/PageViewContext';
import { formatTimeSince } from '../../utils/formatTimeSince';
import './StructurePanel.css';

interface StructurePanelProps {
  viewMode: ViewMode;
  selectedPage: Page | null;
  pages: Page[];
  onPageSelect?: (page: Page) => void;
}

/**
 * Get a readable label for a block based on its type and attributes
 * Returns null for blocks that don't need labels (like layout blocks)
 */
const getBlockLabel = (block: Block): string | null => {
  const { type, attributes } = block;

  switch (type) {
    case 'heading':
      return (attributes as { content?: string })?.content || null;
    case 'paragraph':
      const paraContent = (attributes as { content?: string })?.content || '';
      return paraContent.length > 50
        ? paraContent.substring(0, 50) + '...'
        : paraContent || null;
    case 'button':
      return (attributes as { text?: string })?.text || null;
    case 'card':
      return (attributes as { title?: string })?.title || null;
    case 'quote':
      const quoteContent = (attributes as { content?: string })?.content || '';
      return quoteContent.length > 40
        ? quoteContent.substring(0, 40) + '...'
        : quoteContent || null;
    case 'testimonial':
      const testimonialQuote = (attributes as { quote?: string })?.quote || '';
      return testimonialQuote.length > 40
        ? testimonialQuote.substring(0, 40) + '...'
        : testimonialQuote || null;
    case 'product-card':
      return (attributes as { title?: string })?.title || null;
    case 'image':
      return (attributes as { alt?: string })?.alt || null;
    case 'list':
      const items = (attributes as { items?: string[] })?.items || [];
      return items.length > 0 ? `List (${items.length} items)` : null;
    case 'form':
      return (attributes as { title?: string })?.title || null;
    case 'form-field':
      return (attributes as { label?: string })?.label || null;
    case 'gallery-grid':
      const images = (attributes as { images?: number })?.images;
      return images ? `Gallery (${images} images)` : null;
    // Layout blocks don't need labels
    case 'columns':
    case 'column':
    case 'grid':
    case 'section':
    case 'container':
    case 'spacer':
    case 'divider':
    case 'hero':
      return null;
    default:
      return null;
  }
};

interface BlockTreeItemProps {
  block: Block;
}

const BlockTreeItem = ({ block }: BlockTreeItemProps) => {
  const label = getBlockLabel(block);
  const hasInnerBlocks = block.innerBlocks && block.innerBlocks.length > 0;

  return (
    <div className="structure-block-item col">
      <div className="structure-block-content row gap-xs px-s py-xs radius-m">
        <div className="structure-block-type">{block.type}</div>
        {label && <div className="structure-block-text">{label}</div>}
      </div>
      {hasInnerBlocks && (
        <div className="structure-block-children pl-s">
          {block.innerBlocks!.map((innerBlock) => (
            <BlockTreeItem key={innerBlock.id} block={innerBlock} />
          ))}
        </div>
      )}
    </div>
  );
};

export const StructurePanel = ({
  viewMode,
  selectedPage,
  pages,
  onPageSelect,
}: StructurePanelProps) => {
  // Show selected page's blocks if available (works in both grid and single mode)
  if (selectedPage?.content?.blocks) {
    const blocks = selectedPage.content.blocks;

    return (
      <div className="structure-panel-content">
        <div className="structure-panel-list col p-xs">
          {blocks.length === 0 ? (
            <div className="structure-empty">No blocks in this page</div>
          ) : (
            blocks.map((block) => (
              <BlockTreeItem key={block.id} block={block} />
            ))
          )}
        </div>
      </div>
    );
  }

  // In grid mode with no selection, show page list
  if (viewMode === 'grid') {
    return (
      <div className="structure-panel-content">
        <div className="structure-panel-list col p-xs">
          {pages.map((page) => (
            <button
              key={page.id}
              className="structure-page-item row gap-xs px-s py-xs radius-m"
              onClick={() => onPageSelect?.(page)}
            >
              <div className="structure-page-item__label">{page.label}</div>
              <div className="structure-page-item__date">
                {formatTimeSince(page.meta.dateLastUpdated)}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="structure-panel-content">
      <div className="structure-empty">No content to display</div>
    </div>
  );
};
