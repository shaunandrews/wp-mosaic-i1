import { type HeadingBlock as HeadingBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './HeadingBlock.css';

interface HeadingBlockProps {
  block: HeadingBlockType;
}

export const HeadingBlock = ({ block }: HeadingBlockProps) => {
  const level = block.attributes?.level || 1;
  const content = block.attributes?.content || '';
  const align = block.attributes?.align || 'left';

  const HeadingTag = `h${Math.min(Math.max(level, 1), 6)}` as keyof JSX.IntrinsicElements;

  return (
    <div className={`heading-block align-${align}`}>
      <HeadingTag>{content}</HeadingTag>
      {block.innerBlocks && block.innerBlocks.length > 0 && (
        <div className="heading-block-inner">
          {block.innerBlocks.map((innerBlock) => (
            <BlockRenderer key={innerBlock.id} block={innerBlock} />
          ))}
        </div>
      )}
    </div>
  );
};

