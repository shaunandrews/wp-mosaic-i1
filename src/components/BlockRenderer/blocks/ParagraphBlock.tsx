import { type ParagraphBlock as ParagraphBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './ParagraphBlock.css';

interface ParagraphBlockProps {
  block: ParagraphBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const ParagraphBlock = ({ block, onBlockClick, selectedBlockId }: ParagraphBlockProps) => {
  const content = block.attributes?.content || '';
  const align = block.attributes?.align || 'left';

  return (
    <div className={`paragraph-block align-${align}`}>
      <p>{content}</p>
      {block.innerBlocks && block.innerBlocks.length > 0 && (
        <div className="paragraph-block-inner">
          {block.innerBlocks.map((innerBlock) => (
            <BlockRenderer key={innerBlock.id} block={innerBlock} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />
          ))}
        </div>
      )}
    </div>
  );
};

