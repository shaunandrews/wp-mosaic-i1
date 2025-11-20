// Base block interface - all blocks extend this
export interface BaseBlock {
  id: string;
  type: string;
  attributes?: Record<string, unknown>;
  innerBlocks?: Block[];
}

// Text content blocks
export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  attributes: {
    level?: number; // 1-6
    content: string;
    align?: 'left' | 'center' | 'right';
  };
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
  attributes: {
    content: string;
    align?: 'left' | 'center' | 'right';
  };
}

export interface ListBlock extends BaseBlock {
  type: 'list';
  attributes: {
    ordered?: boolean;
    items: string[];
  };
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote';
  attributes: {
    content: string;
    citation?: string;
  };
}

// Media blocks
export interface ImageBlock extends BaseBlock {
  type: 'image';
  attributes: {
    url?: string;
    alt: string;
    width?: number;
    height?: number;
    aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
  };
}

// Interactive blocks
export interface ButtonBlock extends BaseBlock {
  type: 'button';
  attributes: {
    text: string;
    url?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    align?: 'left' | 'center' | 'right';
  };
}

// Layout blocks
export interface ContainerBlock extends BaseBlock {
  type: 'container';
  attributes: {
    backgroundColor?: string;
    padding?: string;
    maxWidth?: string;
  };
  innerBlocks: Block[];
}

export interface SectionBlock extends BaseBlock {
  type: 'section';
  attributes: {
    backgroundColor?: string;
    padding?: string;
  };
  innerBlocks: Block[];
}

export interface ColumnsBlock extends BaseBlock {
  type: 'columns';
  attributes: {
    columns?: number;
    gap?: string;
  };
  innerBlocks: ColumnBlock[];
}

export interface ColumnBlock extends BaseBlock {
  type: 'column';
  attributes: {
    width?: string; // e.g., "1/2", "1/3", "2/3"
  };
  innerBlocks: Block[];
}

export interface GridBlock extends BaseBlock {
  type: 'grid';
  attributes: {
    columns?: number;
    gap?: string;
  };
  innerBlocks: Block[];
}

export interface SpacerBlock extends BaseBlock {
  type: 'spacer';
  attributes: {
    height?: string;
  };
}

export interface DividerBlock extends BaseBlock {
  type: 'divider';
  attributes: {
    style?: 'solid' | 'dashed' | 'dotted';
  };
}

// Content blocks
export interface HeroBlock extends BaseBlock {
  type: 'hero';
  attributes: {
    title?: string;
    subtitle?: string;
    backgroundImage?: boolean;
    align?: 'left' | 'center' | 'right';
  };
  innerBlocks?: Block[];
}

export interface CardBlock extends BaseBlock {
  type: 'card';
  attributes: {
    title?: string;
    image?: boolean;
  };
  innerBlocks?: Block[];
}

export interface TestimonialBlock extends BaseBlock {
  type: 'testimonial';
  attributes: {
    quote: string;
    author: string;
    role?: string;
    image?: boolean;
  };
}

export interface ProductCardBlock extends BaseBlock {
  type: 'product-card';
  attributes: {
    title: string;
    price?: string;
    image?: boolean;
    onSale?: boolean;
  };
}

export interface GalleryGridBlock extends BaseBlock {
  type: 'gallery-grid';
  attributes: {
    columns?: number;
    gap?: string;
    images: number; // Number of images to display
  };
}

// Form blocks
export interface FormBlock extends BaseBlock {
  type: 'form';
  attributes: {
    title?: string;
    submitText?: string;
  };
  innerBlocks: FormFieldBlock[];
}

export interface FormFieldBlock extends BaseBlock {
  type: 'form-field';
  attributes: {
    label: string;
    type: 'text' | 'email' | 'textarea' | 'tel';
    required?: boolean;
    placeholder?: string;
  };
}

// Union type for all block types
export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | QuoteBlock
  | ImageBlock
  | ButtonBlock
  | ContainerBlock
  | SectionBlock
  | ColumnsBlock
  | ColumnBlock
  | GridBlock
  | SpacerBlock
  | DividerBlock
  | HeroBlock
  | CardBlock
  | TestimonialBlock
  | ProductCardBlock
  | GalleryGridBlock
  | FormBlock
  | FormFieldBlock;

// Page content structure
export interface PageContent {
  blocks: Block[];
}

