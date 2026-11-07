import React, { useState } from 'react';
import { HERO_IMAGE, LEATHER_TRENCH_IMAGE, CROPPED_JACKET_IMAGE } from '../data/products';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatioClass?: string;
  className?: string;
  categoryHint?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = LEATHER_TRENCH_IMAGE,
  aspectRatioClass = 'aspect-[4/5]',
  className = '',
  categoryHint,
  ...props
}) => {
  const [errorCount, setErrorCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // If first image fails, try fallbackSrc (local generated asset). If that fails, show styled graphic fallback
  const currentSrc = errorCount === 0 ? src : errorCount === 1 ? fallbackSrc : null;

  const handleError = () => {
    setErrorCount((prev) => prev + 1);
  };

  if (!currentSrc || errorCount >= 2) {
    return (
      <div
        className={`w-full ${aspectRatioClass} bg-[#F0EBE1] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden border border-[#E5DFD5] ${className}`}
      >
        <div className="absolute inset-0 bg-radial from-[#FAF8F5]/80 to-[#E8E1D5]/90 pointer-events-none" />
        <span className="font-display font-black text-xl tracking-[0.25em] text-[#141210]/30 uppercase mb-2 relative z-10">
          LILI DROBE
        </span>
        <span className="text-xs font-mono uppercase tracking-widest text-[#7C5C3B] relative z-10">
          {categoryHint || 'Archive Piece'}
        </span>
        <span className="text-sm font-medium text-[#141210]/70 line-clamp-2 max-w-[200px] mt-1 relative z-10">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} bg-[#EFEAE2] ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[#EFEAE2] animate-pulse" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
