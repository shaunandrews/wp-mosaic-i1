import { type PageContent as PageContentType } from '../../types/blocks';
import { BlockRenderer } from '../BlockRenderer/BlockRenderer';
import '../../design-system/block-color.css';
import '../../design-system/block-type.css';
import '../../design-system/block-space.css';
import './PageContent.css';

interface PageContentProps {
  content?: PageContentType;
}

export const PageContent = ({ content }: PageContentProps) => {
  if (!content?.blocks || content.blocks.length === 0) {
    return null;
  }

  return (
    <div className="page-content">
      {content.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
};

