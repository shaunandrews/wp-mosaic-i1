import { type ContainerBlock as ContainerBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './ContainerBlock.css';

interface ContainerBlockProps {
  block: ContainerBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const ContainerBlock = ({ block, onBlockClick, selectedBlockId }: ContainerBlockProps) => {
  const backgroundColor = block.attributes?.backgroundColor;
  const padding = block.attributes?.padding;
  const maxWidth = block.attributes?.maxWidth;

  const style: React.CSSProperties = {};
  if (backgroundColor) style.backgroundColor = backgroundColor as string;
  if (padding) style.padding = padding as string;
  if (maxWidth) style.maxWidth = maxWidth as string;

  return (
    <div className="container-block" style={style}>
      {block.innerBlocks?.map((innerBlock) => (
        <BlockRenderer key={innerBlock.id} block={innerBlock} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />
      ))}
    </div>
  );
};

