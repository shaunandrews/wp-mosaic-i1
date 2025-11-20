import { type ContainerBlock as ContainerBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './ContainerBlock.css';

interface ContainerBlockProps {
  block: ContainerBlockType;
}

export const ContainerBlock = ({ block }: ContainerBlockProps) => {
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
        <BlockRenderer key={innerBlock.id} block={innerBlock} />
      ))}
    </div>
  );
};

