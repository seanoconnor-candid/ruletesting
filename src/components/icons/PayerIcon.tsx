import React from 'react';

interface PayerIconProps {
  className?: string;
  size?: number;
}

const PayerIcon: React.FC<PayerIconProps> = ({
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
      <circle cx="18" cy="18" r="16.375" fill="url(#paint0_radial_1047_2411)" stroke="#4534FF" strokeWidth="0.75"/>
      <path d="M12.5001 23.9423V15.9423H13.5001V23.9423H12.5001ZM17.5001 23.9423V15.9423H18.5001V23.9423H17.5001ZM9.53857 26.9423V25.9423H26.4616V26.9423H9.53857ZM22.5001 23.9423V15.9423H23.5001V23.9423H22.5001ZM9.53857 13.9423V13.096L18.0001 9.05777L26.4616 13.096V13.9423H9.53857ZM12.1808 12.9423H23.8193L18.0001 10.1923L12.1808 12.9423Z" fill="#2E04E8"/>
      <defs>
        <radialGradient id="paint0_radial_1047_2411" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13.3548 11.2903) rotate(59.8064) scale(47.1379)">
          <stop offset="0.230769" stopColor="white"/>
          <stop offset="0.847282" stopColor="#B1BCF1"/>
        </radialGradient>
      </defs>
    </svg>
  );
};

export default PayerIcon;