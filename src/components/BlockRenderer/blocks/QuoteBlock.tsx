import { type QuoteBlock as QuoteBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './QuoteBlock.css';

interface QuoteBlockProps {
  block: QuoteBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const QuoteBlock = ({ block, onBlockClick, selectedBlockId }: QuoteBlockProps) => {
  const content = block.attributes?.content || '';
  const citation = block.attributes?.citation;

  return (
    <div className="quote-block">
      <blockquote>
        <p>{content}</p>
        {citation && <cite>{citation}</cite>}
      </blockquote>
      {block.innerBlocks && block.innerBlocks.length > 0 && (
        <div className="quote-block-inner">
          {block.innerBlocks.map((innerBlock) => (
            <BlockRenderer key={innerBlock.id} block={innerBlock} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />
          ))}
        </div>
      )}
    </div>
  );
};

