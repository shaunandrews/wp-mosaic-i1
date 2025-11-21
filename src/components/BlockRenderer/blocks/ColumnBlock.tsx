import { type ColumnBlock as ColumnBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './ColumnBlock.css';

interface ColumnBlockProps {
  block: ColumnBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const ColumnBlock = ({ block, onBlockClick, selectedBlockId }: ColumnBlockProps) => {
  return (
    <div className="column-block">
      {block.innerBlocks?.map((innerBlock) => (
        <BlockRenderer key={innerBlock.id} block={innerBlock} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />
      ))}
    </div>
  );
};

