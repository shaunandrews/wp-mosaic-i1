import { type HeroBlock as HeroBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './HeroBlock.css';

interface HeroBlockProps {
  block: HeroBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const HeroBlock = ({ block, onBlockClick, selectedBlockId }: HeroBlockProps) => {
  const title = block.attributes?.title;
  const subtitle = block.attributes?.subtitle;
  const backgroundImage = block.attributes?.backgroundImage;
  const align = block.attributes?.align || 'center';

  return (
    <div
      className={`hero-block align-${align} ${backgroundImage ? 'has-background' : ''}`}
    >
      {title && <h1 className="hero-title">{title as string}</h1>}
      {subtitle && <p className="hero-subtitle">{subtitle as string}</p>}
      {block.innerBlocks && block.innerBlocks.length > 0 && (
        <div className="hero-content">
          {block.innerBlocks.map((innerBlock) => (
            <BlockRenderer key={innerBlock.id} block={innerBlock} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />
          ))}
        </div>
      )}
    </div>
  );
};

