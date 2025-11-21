import { type CardBlock as CardBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './CardBlock.css';

interface CardBlockProps {
  block: CardBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const CardBlock = ({ block, onBlockClick, selectedBlockId }: CardBlockProps) => {
  const title = block.attributes?.title;
  const image = block.attributes?.image;

  // Generate picsum.photos URL using block ID as seed
  const imageUrl = image
    ? `https://picsum.photos/seed/${block.id}/800/450`
    : null;

  return (
    <div className="card-block">
      {image && imageUrl && (
        <div className="card-image">
          <img src={imageUrl} alt={title ? (title as string) : 'Card image'} />
        </div>
      )}
      {title && <h3 className="card-title">{title as string}</h3>}
      {block.innerBlocks && block.innerBlocks.length > 0 && (
        <div className="card-content">
          {block.innerBlocks.map((innerBlock) => (
            <BlockRenderer key={innerBlock.id} block={innerBlock} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />
          ))}
        </div>
      )}
    </div>
  );
};

