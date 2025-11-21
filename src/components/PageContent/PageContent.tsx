import { type PageContent as PageContentType } from '../../types/blocks';
import { BlockRenderer } from '../BlockRenderer/BlockRenderer';
import '../../design-system/block-color.css';
import '../../design-system/block-type.css';
import '../../design-system/block-space.css';
import './PageContent.css';

interface PageContentProps {
  content?: PageContentType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
  onContentClick?: (e: React.MouseEvent) => void;
}

export const PageContent = ({ content, onBlockClick, selectedBlockId, onContentClick }: PageContentProps) => {
  if (!content?.blocks || content.blocks.length === 0) {
    return null;
  }

  return (
    <div className="page-content" onClick={onContentClick}>
      {content.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />
      ))}
    </div>
  );
};

