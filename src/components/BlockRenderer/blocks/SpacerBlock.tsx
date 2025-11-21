import { type SpacerBlock as SpacerBlockType } from '../../../types/blocks';
import './SpacerBlock.css';

interface SpacerBlockProps {
  block: SpacerBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const SpacerBlock = ({ block }: SpacerBlockProps) => {
  const height = block.attributes?.height || 'var(--block-space-6)';

  return <div className="spacer-block" style={{ height: height as string }} />;
};

