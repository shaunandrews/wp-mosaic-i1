import { type DividerBlock as DividerBlockType } from '../../../types/blocks';
import './DividerBlock.css';

interface DividerBlockProps {
  block: DividerBlockType;
}

export const DividerBlock = ({ block }: DividerBlockProps) => {
  const style = block.attributes?.style || 'solid';

  return (
    <div className={`divider-block divider-${style}`}>
      <hr />
    </div>
  );
};

