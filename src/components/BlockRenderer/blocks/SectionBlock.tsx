import { type SectionBlock as SectionBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './SectionBlock.css';

interface SectionBlockProps {
  block: SectionBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const SectionBlock = ({ block, onBlockClick, selectedBlockId }: SectionBlockProps) => {
  const backgroundColor = block.attributes?.backgroundColor;
  const padding = block.attributes?.padding;

  const style: React.CSSProperties = {};
  if (backgroundColor) style.backgroundColor = backgroundColor as string;
  if (padding) style.padding = padding as string;

  return (
    <section className="section-block" style={style}>
      {block.innerBlocks?.map((innerBlock) => (
        <BlockRenderer key={innerBlock.id} block={innerBlock} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />
      ))}
    </section>
  );
};

