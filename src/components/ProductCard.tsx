import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { toggleWishlist, isWishlisted, setQuickViewProduct } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const displayImage = isHovered && product.secondaryImage ? product.secondaryImage : product.primaryImage;

  return (
    <div
      className={`group relative flex flex-col bg-white border border-[#EBE5DB] transition-all duration-300 hover:border-[#141210] hover:shadow-md ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F3EFEA]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <ImageWithFallback
            src={displayImage}
            alt={product.name}
            aspectRatioClass="aspect-[3/4]"
            categoryHint={product.category}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Top Badges / Indicators */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none z-10">
          <div className="flex flex-col gap-1">
            {product.isRarePiece && (
              <span className="bg-[#141210] text-[#FAF8F5] text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 pointer-events-auto">
                Rare Grail
              </span>
            )}
            {product.stockCount === 1 && !product.isRarePiece && (
              <span className="bg-[#7C5C3B] text-[#FAF8F5] text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 pointer-events-auto">
                1-of-1 Piece
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`p-2 rounded-full transition-colors pointer-events-auto shadow-sm ${
              wishlisted
                ? 'bg-[#141210] text-red-400 hover:bg-[#25221F]'
                : 'bg-white/90 text-[#141210] hover:bg-white hover:text-red-500 backdrop-blur-xs'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-400 stroke-red-400' : ''}`} />
          </button>
        </div>

        {/* Quick View Button (desktop hover / mobile accessible) */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-white/95 hover:bg-[#141210] text-[#141210] hover:text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-3 backdrop-blur-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Info Area */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Metadata line: Unboxed text with subtle separator */}
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#7C5C3B] uppercase mb-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-[#C5BDB0]">/</span>
            <span>{product.era}</span>
            <span aria-hidden="true" className="text-[#C5BDB0]">/</span>
            <span className="text-[#57524D]">{product.condition}</span>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.id}`}
            className="block text-sm font-semibold text-[#141210] group-hover:text-[#7C5C3B] transition-colors line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Size Bar */}
        <div className="mt-3 pt-2.5 border-t border-[#F2ECE3] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-[#141210] tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="font-mono text-xs text-[#9E978E] line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="text-[11px] font-mono text-[#736B63] flex items-center gap-1">
            <span>{product.sizes.join(', ')}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#141210]" />
          </div>
        </div>
      </div>
    </div>
  );
};
