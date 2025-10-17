import React from 'react';

interface ServiceFacilityIconProps {
  className?: string;
  size?: number;
}

const ServiceFacilityIcon: React.FC<ServiceFacilityIconProps> = ({
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
      <circle cx="18" cy="18" r="16.375" fill="url(#paint0_radial_service_facility)" stroke="#4534FF" strokeWidth="0.75"/>
      <g transform="translate(8.5, 8)">
        <path d="M2.15625 16.7105V3.28949H9.26151V6.44738H16.7919V16.7105H2.15625ZM2.94572 15.9211H8.47204V13.5526H2.94572V15.9211ZM2.94572 12.7632H8.47204V10.3948H2.94572V12.7632ZM2.94572 9.60528H8.47204V7.23686H2.94572V9.60528ZM2.94572 6.44738H8.47204V4.07896H2.94572V6.44738ZM9.26151 15.9211H16.0024V7.23686H9.26151V15.9211ZM11.1442 10.3948V9.60528H13.8162V10.3948H11.1442ZM11.1442 13.5526V12.7632H13.8162V13.5526H11.1442Z" fill="#2E04E8"/>
      </g>
      <defs>
        <radialGradient id="paint0_radial_service_facility" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13.3548 11.2903) rotate(59.8064) scale(47.1379)">
          <stop offset="0.230769" stopColor="white"/>
          <stop offset="0.847282" stopColor="#B1BCF1"/>
        </radialGradient>
      </defs>
    </svg>
  );
};

export default ServiceFacilityIcon;