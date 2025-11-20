import { type ColumnBlock as ColumnBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './ColumnBlock.css';

interface ColumnBlockProps {
  block: ColumnBlockType;
}

export const ColumnBlock = ({ block }: ColumnBlockProps) => {
  return (
    <div className="column-block">
      {block.innerBlocks?.map((innerBlock) => (
        <BlockRenderer key={innerBlock.id} block={innerBlock} />
      ))}
    </div>
  );
};

