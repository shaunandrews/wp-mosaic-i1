import React from 'react';
import { type HeadingBlock as HeadingBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './HeadingBlock.css';

interface HeadingBlockProps {
  block: HeadingBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const HeadingBlock = ({ block, onBlockClick, selectedBlockId }: HeadingBlockProps) => {
  const level = block.attributes?.level || 1;
  const content = block.attributes?.content || '';
  const align = block.attributes?.align || 'left';

  const headingLevel = Math.min(Math.max(level, 1), 6);
  const HeadingTag = `h${headingLevel}` as React.ElementType;

  return (
    <div className={`heading-block align-${align}`}>
      <HeadingTag>{content}</HeadingTag>
      {block.innerBlocks && block.innerBlocks.length > 0 && (
        <div className="heading-block-inner">
          {block.innerBlocks.map((innerBlock) => (
            <BlockRenderer key={innerBlock.id} block={innerBlock} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />
          ))}
        </div>
      )}
    </div>
  );
};

