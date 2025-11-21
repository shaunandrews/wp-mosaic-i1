import { type DividerBlock as DividerBlockType } from '../../../types/blocks';
import './DividerBlock.css';

interface DividerBlockProps {
  block: DividerBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const DividerBlock = ({ block }: DividerBlockProps) => {
  const style = block.attributes?.style || 'solid';

  return (
    <div className={`divider-block divider-${style}`}>
      <hr />
    </div>
  );
};

