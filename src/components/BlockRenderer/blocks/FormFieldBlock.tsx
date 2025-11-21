import { type FormFieldBlock as FormFieldBlockType } from '../../../types/blocks';
import './FormFieldBlock.css';

interface FormFieldBlockProps {
  block: FormFieldBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const FormFieldBlock = ({ block }: FormFieldBlockProps) => {
  const label = block.attributes?.label || '';
  const type = (block.attributes?.type || 'text') as 'text' | 'email' | 'textarea' | 'tel';
  const required = block.attributes?.required || false;
  const placeholder = block.attributes?.placeholder;

  return (
    <div className="form-field-block">
      <label className="form-field-label">
        {label}
        {required && <span className="form-field-required">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          className="form-field-input"
          placeholder={placeholder as string}
          required={required}
          rows={4}
        />
      ) : (
        <input
          className="form-field-input"
          type={type}
          placeholder={placeholder as string}
          required={required}
        />
      )}
    </div>
  );
};

