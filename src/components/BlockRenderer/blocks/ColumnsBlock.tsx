import { type ColumnsBlock as ColumnsBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './ColumnsBlock.css';

interface ColumnsBlockProps {
  block: ColumnsBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const ColumnsBlock = ({ block, onBlockClick, selectedBlockId }: ColumnsBlockProps) => {
  const columns = block.attributes?.columns || 2;
  const gap = block.attributes?.gap || 'var(--block-space-5)';

  const style: React.CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gap as string,
  };

  return (
    <div className="columns-block" style={style}>
      {block.innerBlocks?.map((innerBlock) => (
        <BlockRenderer key={innerBlock.id} block={innerBlock} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />
      ))}
    </div>
  );
};

