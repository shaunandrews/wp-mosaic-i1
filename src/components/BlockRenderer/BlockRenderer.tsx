import { type Block, type BaseBlock } from '../../types/blocks';
import { HeadingBlock } from './blocks/HeadingBlock';
import { ParagraphBlock } from './blocks/ParagraphBlock';
import { ListBlock } from './blocks/ListBlock';
import { QuoteBlock } from './blocks/QuoteBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { ButtonBlock } from './blocks/ButtonBlock';
import { ContainerBlock } from './blocks/ContainerBlock';
import { SectionBlock } from './blocks/SectionBlock';
import { ColumnsBlock } from './blocks/ColumnsBlock';
import { ColumnBlock } from './blocks/ColumnBlock';
import { GridBlock } from './blocks/GridBlock';
import { SpacerBlock } from './blocks/SpacerBlock';
import { DividerBlock } from './blocks/DividerBlock';
import { HeroBlock } from './blocks/HeroBlock';
import { CardBlock } from './blocks/CardBlock';
import { TestimonialBlock } from './blocks/TestimonialBlock';
import { ProductCardBlock } from './blocks/ProductCardBlock';
import { GalleryGridBlock } from './blocks/GalleryGridBlock';
import { FormBlock } from './blocks/FormBlock';
import { FormFieldBlock } from './blocks/FormFieldBlock';
import './BlockRenderer.css';

interface BlockRendererProps {
  block: Block;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

const renderBlock = (block: Block, onBlockClick?: (blockId: string) => void, selectedBlockId?: string | null) => {
  switch (block.type) {
    case 'heading':
      return <HeadingBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'paragraph':
      return <ParagraphBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'list':
      return <ListBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'quote':
      return <QuoteBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'image':
      return <ImageBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'button':
      return <ButtonBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'container':
      return <ContainerBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'section':
      return <SectionBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'columns':
      return <ColumnsBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'column':
      return <ColumnBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'grid':
      return <GridBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'spacer':
      return <SpacerBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'divider':
      return <DividerBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'hero':
      return <HeroBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'card':
      return <CardBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'testimonial':
      return <TestimonialBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'product-card':
      return <ProductCardBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'gallery-grid':
      return <GalleryGridBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'form':
      return <FormBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    case 'form-field':
      return <FormFieldBlock block={block} onBlockClick={onBlockClick} selectedBlockId={selectedBlockId} />;
    default:
      // Fallback for unknown block types
      console.warn(`Unknown block type: ${(block as BaseBlock).type}`);
      return null;
  }
};

export const BlockRenderer = ({ block, onBlockClick, selectedBlockId }: BlockRendererProps) => {
  const isSelected = selectedBlockId === block.id;
  const blockContent = renderBlock(block, onBlockClick, selectedBlockId);

  if (!blockContent) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBlockClick?.(block.id);
  };

  return (
    <div
      className={`block-renderer ${isSelected ? 'is-selected' : ''}`}
      onClick={handleClick}
      data-block-id={block.id}
    >
      {blockContent}
    </div>
  );
};

