import './Icon.css';

interface IconProps {
  name:
    | 'chevron-right-small'
    | 'chevron-left-small'
    | 'chevron-down-small'
    | 'drawer-right'
    | 'view-desktop'
    | 'list'
    | 'plus'
    | 'more'
    | 'undo'
    | 'redo';
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
  'view-desktop': (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5 16H19.8V8C19.8 6.9 18.9 6 17.8 6H6.2C5.1 6 4.2 6.9 4.2 8V16H3.5C2.7 16 2 16.7 2 17.5H22C22 16.7 21.3 16 20.5 16ZM5.7 8C5.7 7.7 5.9 7.5 6.2 7.5H17.8C18.1 7.5 18.3 7.7 18.3 8V15.6H5.7V8Z"
        fill="currentColor"
      />
    </svg>
  ),
  'drawer-right': (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18 4H6C4.9 4 4 4.9 4 6V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V6C20 4.9 19.1 4 18 4ZM14 18.5H6C5.7 18.5 5.5 18.3 5.5 18V6C5.5 5.7 5.7 5.5 6 5.5H14V18.5ZM18.5 18C18.5 18.3 18.3 18.5 18 18.5H15.5V5.5H18C18.3 5.5 18.5 5.7 18.5 6V18Z"
        fill="currentColor"
      />
    </svg>
  ),
  list: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6H14V7.5H3V6ZM6.5 11.5H17.5V13H6.5V11.5ZM21 17H10V18.5H21V17Z"
        fill="currentColor"
      />
    </svg>
  ),
  plus: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"
        fill="currentColor"
      />
    </svg>
  ),
  more: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 19H11V17H13V19ZM13 13H11V11H13V13ZM13 7H11V5H13V7Z"
        fill="currentColor"
      />
    </svg>
  ),
  undo: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3 11.7C17.7 11.1 16.9 10.8 16 10.8H6.7L9.6 7.5L8.5 6.5L4 11.5L8.5 16L9.5 15L6.8 12.3H16C16.5 12.3 16.9 12.5 17.3 12.8C18.3 13.8 18.3 16.2 18.3 17.3V17.6H19.8V17.4C19.8 15.9 19.8 13.1 18.3 11.7Z"
        fill="currentColor"
      />
    </svg>
  ),
  redo: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.3 6L14.2 7L17.1 10.3H7.7C6.8 10.3 6 10.6 5.4 11.2C4 12.7 4 15.4 4 16.8V17H5.5V16.7C5.5 15.6 5.5 13.2 6.5 12.2C6.8 11.9 7.2 11.7 7.8 11.7H17L14.2 14.5L15.3 15.6L19.9 11L15.3 6Z"
        fill="currentColor"
      />
    </svg>
  ),
};

export const Icon = ({ name }: IconProps) => {
  return <span className="icon">{iconMap[name]}</span>;
};
