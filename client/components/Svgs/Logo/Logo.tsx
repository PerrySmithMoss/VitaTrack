import React from 'react';

interface LogoProps {
  height?: number;
  width?: number;
}

export const Logo: React.FC<LogoProps> = ({ height, width }) => {
  return (
    <svg
      height={typeof height === 'number' ? height : 62}
      width={typeof width === 'number' ? width : 63}
      viewBox="0 0 63 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.5 7.27389C28.35 2.87039 23.1934 0 17.366 0C7.77496 0 0 7.77429 0 17.3645C0 21.5334 1.46936 25.3587 3.91835 28.3517L31.5 61.9998V7.27389Z"
        fill="#FF3F62"
      />
      <path
        d="M31.5 40.8926V61.9998L41.0124 50.3953V40.8926H31.5Z"
        fill="#C61469"
      />
      <path
        d="M41.0124 28.4184V18.9069H53.4876V28.4184H59.0271L59.0817 28.3517C61.5306 25.3587 63 21.5334 63 17.3645C63 7.77428 55.225 0 45.634 0C39.8066 0 34.65 2.87039 31.5 7.27389V28.4184H41.0124Z"
        fill="#C61469"
      />
      <path
        d="M53.4876 28.4188V18.9072H47.25V50.4045H53.4876V40.8929H63V28.4188H53.4876Z"
        fill="#00CCB3"
      />
      <path
        d="M47.25 18.9072H41.0124V28.4188H31.5V40.8929H41.0124V50.4045H47.25V18.9072Z"
        fill="#00EED1"
      />
    </svg>
  );
};
