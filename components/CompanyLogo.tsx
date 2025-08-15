import React from 'react';

interface CompanyLogoProps {
  className?: string;
  variant?: 'color' | 'white';
  showText?: boolean;
  iconClassName?: string;
  textClassName?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ 
  className, 
  variant = 'color',
  showText = true,
  iconClassName = 'h-8 w-8',
  textClassName = 'text-xl font-bold tracking-tight',
}) => {
  const textColorClass = variant === 'white' ? 'text-white' : 'text-cyan-700';
  
  // Use a direct link derived from the user's Google Drive share link.
  const logoSrc = 'https://drive.google.com/uc?export=view&id=1QfupGxPR5v_tK5fUtfd9B89Z03mmALJz';

  // Note: Using a single logo for both light and dark backgrounds.
  // The 'variant' prop will now only affect the text color.

  return (
    <div className={`flex items-center ${className || ''}`}>
      <img
        src={logoSrc}
        alt="Kaliyuga Adventure Logo"
        className={iconClassName}
        aria-hidden="true"
      />
      {showText && (
          <span className={`ml-3 ${textColorClass} ${textClassName}`}>
            Kaliyuga Adventure
          </span>
      )}
    </div>
  );
};