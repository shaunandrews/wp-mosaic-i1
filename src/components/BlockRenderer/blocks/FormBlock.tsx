import { type FormBlock as FormBlockType } from '../../../types/blocks';
import { BlockRenderer } from '../BlockRenderer';
import { Button } from '../../Button/Button';
import './FormBlock.css';

interface FormBlockProps {
  block: FormBlockType;
}

export const FormBlock = ({ block }: FormBlockProps) => {
  const title = block.attributes?.title;
  const submitText = block.attributes?.submitText || 'Submit';

  return (
    <div className="form-block">
      {title && <h3 className="form-title">{title as string}</h3>}
      <form className="form-content">
        {block.innerBlocks?.map((innerBlock) => (
          <BlockRenderer key={innerBlock.id} block={innerBlock} />
        ))}
        <div className="form-submit">
          <Button variant="primary" type="submit">
            {submitText as string}
          </Button>
        </div>
      </form>
    </div>
  );
};

