import './Icon.css';

interface IconProps {
  name: 'chevron-right-small' | 'chevron-left-small' | 'chevron-down-small';
}

const iconMap: Record<string, React.ReactNode> = {
  'chevron-right-small': (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.8621 8.04053L14.2804 12.0286L10.8621 16.0167L9.72314 15.0405L12.3048 12.0286L9.72314 9.01672L10.8621 8.04053Z"
        fill="currentColor"
      />
    </svg>
  ),
  'chevron-left-small': (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.1002 16L9.7002 12L13.1002 8L14.2002 9L11.6002 12L14.2002 15L13.1002 16Z"
        fill="currentColor"
      />
    </svg>
  ),
  'chevron-down-small': (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.9902 10.889L12.0022 14.307L8.01416 10.889L8.99016 9.74899L12.0022 12.331L15.0142 9.74999L15.9902 10.889Z"
        fill="currentColor"
      />
    </svg>
  ),
};

export const Icon = ({ name }: IconProps) => {
  return <span className="icon">{iconMap[name]}</span>;
};
