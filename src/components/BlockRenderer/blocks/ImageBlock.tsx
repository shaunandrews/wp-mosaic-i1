import { type ImageBlock as ImageBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './ImageBlock.css';

interface ImageBlockProps {
  block: ImageBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const ImageBlock = ({ block, onBlockClick, selectedBlockId }: ImageBlockProps) => {
  const alt = block.attributes?.alt || '';
  const url = block.attributes?.url;
  const aspectRatio = block.attributes?.aspectRatio || '16/9';
  const width = block.attributes?.width;
  const height = block.attributes?.height;

  // Calculate aspect ratio for placeholder
  const [ratioWidth, ratioHeight] = aspectRatio.split('/').map(Number);
  const paddingBottom = (ratioHeight / ratioWidth) * 100;

  // Generate picsum.photos URL if no URL provided
  // Use block ID as seed for consistent images
  const getPicsumUrl = () => {
    const seed = block.id || 'default';
    const imgWidth = width || 800;
    const imgHeight = height || Math.round((imgWidth * ratioHeight) / ratioWidth);
    return `https://picsum.photos/seed/${seed}/${imgWidth}/${imgHeight}`;
  };

  const imageUrl = url || getPicsumUrl();

  const style: React.CSSProperties = {
    paddingBottom: `${paddingBottom}%`,
  };

  if (width) style.width = `${width}px`;
  if (height) style.height = `${height}px`;

  return (
    <div className="image-block">
      <div className="image-wrapper" style={style}>
        <img src={imageUrl} alt={alt} />
      </div>
      {block.innerBlocks && block.innerBlocks.length > 0 && (
        <div className="image-block-inner">
          {block.innerBlocks.map((innerBlock) => (
            <BlockRenderer key={innerBlock.id} block={innerBlock} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />
          ))}
        </div>
      )}
    </div>
  );
};

