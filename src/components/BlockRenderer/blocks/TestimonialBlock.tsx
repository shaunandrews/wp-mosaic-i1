import { type TestimonialBlock as TestimonialBlockType } from '../../../types/blocks';
import './TestimonialBlock.css';

interface TestimonialBlockProps {
  block: TestimonialBlockType;
  onBlockClick?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const TestimonialBlock = ({ block }: TestimonialBlockProps) => {
  const quote = block.attributes?.quote || '';
  const author = block.attributes?.author || '';
  const role = block.attributes?.role;
  const image = block.attributes?.image;

  // Generate picsum.photos URL for avatar (48x48)
  const avatarUrl = image ? `https://picsum.photos/seed/${block.id}/48/48` : null;

  return (
    <div className="testimonial-block">
      <blockquote className="testimonial-quote">
        <p>{quote}</p>
      </blockquote>
      <div className="testimonial-author">
        {image && avatarUrl && (
          <div className="testimonial-image">
            <img src={avatarUrl} alt={author} />
          </div>
        )}
        <div className="testimonial-info">
          <div className="testimonial-name">{author}</div>
          {role && <div className="testimonial-role">{role as string}</div>}
        </div>
      </div>
    </div>
  );
};

