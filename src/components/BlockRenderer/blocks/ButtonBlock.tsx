import { type ButtonBlock as ButtonBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import { Button } from '../../Button/Button';
import './ButtonBlock.css';

interface ButtonBlockProps {
  block: ButtonBlockType;
}

export const ButtonBlock = ({ block }: ButtonBlockProps) => {
  const text = block.attributes?.text || '';
  const url = block.attributes?.url;
  const variant = block.attributes?.variant || 'default';
  const align = block.attributes?.align || 'left';

  const buttonElement = (
    <Button variant={variant === 'primary' ? 'primary' : 'default'}>
      {text}
    </Button>
  );

  return (
    <div className={`button-block align-${align}`}>
      {url ? (
        <a href={url} className="button-link" onClick={(e) => e.preventDefault()}>
          {buttonElement}
        </a>
      ) : (
        buttonElement
      )}
      {block.innerBlocks && block.innerBlocks.length > 0 && (
        <div className="button-block-inner">
          {block.innerBlocks.map((innerBlock) => (
            <BlockRenderer key={innerBlock.id} block={innerBlock} />
          ))}
        </div>
      )}
    </div>
  );
};

