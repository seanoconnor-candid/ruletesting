import React from 'react';

interface ProviderIconProps {
  className?: string;
  size?: number;
}

const ProviderIcon: React.FC<ProviderIconProps> = ({
  className = '',
  size = 36
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="16.375" fill="url(#paint0_radial_1047_3603)" stroke="#4534FF" strokeWidth="0.75"/>
      <path d="M14.673 26V21.327H10V14.6923H14.673V10H21.3077V14.6923H26V21.327H21.3077V26H14.673ZM15.673 25H20.3077V20.327H25V15.6923H20.3077V11H15.673V15.6923H11V20.327H15.673V25Z" fill="#2E04E8"/>
      <defs>
        <radialGradient id="paint0_radial_1047_3603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13.3548 11.2903) rotate(59.8064) scale(47.1379)">
          <stop offset="0.230769" stopColor="white"/>
          <stop offset="0.847282" stopColor="#B1BCF1"/>
        </radialGradient>
      </defs>
    </svg>
  );
};

export default ProviderIcon;