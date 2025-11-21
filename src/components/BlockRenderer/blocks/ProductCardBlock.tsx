import { type ProductCardBlock as ProductCardBlockType } from '../../../types/blocks';
import './ProductCardBlock.css';

interface ProductCardBlockProps {
  block: ProductCardBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const ProductCardBlock = ({ block }: ProductCardBlockProps) => {
  const title = block.attributes?.title || '';
  const price = block.attributes?.price;
  const image = block.attributes?.image;
  const onSale = block.attributes?.onSale;

  // Generate picsum.photos URL using block ID as seed (square image for products)
  const imageUrl = image ? `https://picsum.photos/seed/${block.id}/400/400` : null;

  return (
    <div className="product-card-block">
      {image && imageUrl && (
        <div className="product-image">
          <img src={imageUrl} alt={title} />
          {onSale && <span className="product-badge">Sale</span>}
        </div>
      )}
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        {price && (
          <div className="product-price">
            {onSale && <span className="product-price-original">${price}</span>}
            <span className="product-price-current">
              ${onSale ? (parseFloat(price as string) * 0.8).toFixed(2) : price}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

