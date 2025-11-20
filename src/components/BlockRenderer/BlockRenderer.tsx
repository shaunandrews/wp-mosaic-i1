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
}

export const BlockRenderer = ({ block }: BlockRendererProps) => {
  switch (block.type) {
    case 'heading':
      return <HeadingBlock block={block} />;
    case 'paragraph':
      return <ParagraphBlock block={block} />;
    case 'list':
      return <ListBlock block={block} />;
    case 'quote':
      return <QuoteBlock block={block} />;
    case 'image':
      return <ImageBlock block={block} />;
    case 'button':
      return <ButtonBlock block={block} />;
    case 'container':
      return <ContainerBlock block={block} />;
    case 'section':
      return <SectionBlock block={block} />;
    case 'columns':
      return <ColumnsBlock block={block} />;
    case 'column':
      return <ColumnBlock block={block} />;
    case 'grid':
      return <GridBlock block={block} />;
    case 'spacer':
      return <SpacerBlock block={block} />;
    case 'divider':
      return <DividerBlock block={block} />;
    case 'hero':
      return <HeroBlock block={block} />;
    case 'card':
      return <CardBlock block={block} />;
    case 'testimonial':
      return <TestimonialBlock block={block} />;
    case 'product-card':
      return <ProductCardBlock block={block} />;
    case 'gallery-grid':
      return <GalleryGridBlock block={block} />;
    case 'form':
      return <FormBlock block={block} />;
    case 'form-field':
      return <FormFieldBlock block={block} />;
    default:
      // Fallback for unknown block types
      console.warn(`Unknown block type: ${(block as BaseBlock).type}`);
      return null;
  }
};

