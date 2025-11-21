import { type GalleryGridBlock as GalleryGridBlockType } from '../../../types/blocks';
import './GalleryGridBlock.css';

interface GalleryGridBlockProps {
  block: GalleryGridBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const GalleryGridBlock = ({ block }: GalleryGridBlockProps) => {
  const images = block.attributes?.images || 6;
  const columns = block.attributes?.columns || 3;
  const gap = block.attributes?.gap || 'var(--block-space-3)';

  const style: React.CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gap as string,
  };

  return (
    <div className="gallery-grid-block" style={style}>
      {Array.from({ length: images as number }).map((_, index) => {
        // Use block ID + index as seed for unique images
        const seed = `${block.id}-${index}`;
        const imageUrl = `https://picsum.photos/seed/${seed}/400/400`;
        return (
          <div key={index} className="gallery-item">
            <img src={imageUrl} alt={`Gallery image ${index + 1}`} />
          </div>
        );
      })}
    </div>
  );
};

