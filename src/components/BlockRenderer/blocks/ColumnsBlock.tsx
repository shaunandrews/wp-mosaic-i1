import { type ColumnsBlock as ColumnsBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './ColumnsBlock.css';

interface ColumnsBlockProps {
  block: ColumnsBlockType;
}

export const ColumnsBlock = ({ block }: ColumnsBlockProps) => {
  const columns = block.attributes?.columns || 2;
  const gap = block.attributes?.gap || 'var(--block-space-5)';

  const style: React.CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gap as string,
  };

  return (
    <div className="columns-block" style={style}>
      {block.innerBlocks?.map((innerBlock) => (
        <BlockRenderer key={innerBlock.id} block={innerBlock} />
      ))}
    </div>
  );
};

