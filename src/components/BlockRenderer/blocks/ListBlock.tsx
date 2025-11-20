import { type ListBlock as ListBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import './ListBlock.css';

interface ListBlockProps {
  block: ListBlockType;
}

export const ListBlock = ({ block }: ListBlockProps) => {
  const items = block.attributes?.items || [];
  const ordered = block.attributes?.ordered || false;

  const ListTag = ordered ? 'ol' : 'ul';

  return (
    <div className="list-block">
      <ListTag>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ListTag>
      {block.innerBlocks && block.innerBlocks.length > 0 && (
        <div className="list-block-inner">
          {block.innerBlocks.map((innerBlock) => (
            <BlockRenderer key={innerBlock.id} block={innerBlock} />
          ))}
        </div>
      )}
    </div>
  );
};

