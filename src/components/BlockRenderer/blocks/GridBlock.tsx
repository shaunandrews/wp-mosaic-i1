import { type GridBlock as GridBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './GridBlock.css';

interface GridBlockProps {
  block: GridBlockType;
}

export const GridBlock = ({ block }: GridBlockProps) => {
  const columns = block.attributes?.columns || 3;
  const gap = block.attributes?.gap || 'var(--block-space-5)';

  const style: React.CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gap as string,
  };

  return (
    <div className="grid-block" style={style}>
      {block.innerBlocks?.map((innerBlock) => (
        <BlockRenderer key={innerBlock.id} block={innerBlock} />
      ))}
    </div>
  );
};

