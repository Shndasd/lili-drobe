import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from './ImageWithFallback';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted } = useShop();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0] || '');
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const wishlisted = isWishlisted(quickViewProduct.id);
  const images = quickViewProduct.images && quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : [quickViewProduct.primaryImage];

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(quickViewProduct, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141210]/70 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
        aria-hidden="true"
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-8">
        <div className="inline-block w-full max-w-4xl bg-white border border-[#E5DFD5] text-left align-middle shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
          
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-[#57524D] hover:text-[#141210] bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] transition-colors rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Gallery Left */}
            <div className="bg-[#FAF8F5] p-6 border-b md:border-b-0 md:border-r border-[#E5DFD5] flex flex-col justify-between">
              <div className="relative aspect-[4/5] w-full bg-[#EFEAE2] border border-[#E5DFD5] overflow-hidden">
                <ImageWithFallback
                  src={images[activeImageIndex] || quickViewProduct.primaryImage}
                  alt={quickViewProduct.name}
                  aspectRatioClass="aspect-[4/5]"
                  categoryHint={quickViewProduct.category}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-18 shrink-0 border transition-all overflow-hidden ${
                        activeImageIndex === idx ? 'border-[#141210] ring-1 ring-[#141210]' : 'border-[#E5DFD5] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`View ${idx + 1}`}
                        aspectRatioClass="aspect-[4/5]"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Right */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                {/* Clean unboxed metadata */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#7C5C3B] uppercase tracking-wider mb-2">
                  <span>{quickViewProduct.category}</span>
                  <span aria-hidden="true" className="text-[#D9D2C7]">·</span>
                  <span>{quickViewProduct.era}</span>
                  <span aria-hidden="true" className="text-[#D9D2C7]">·</span>
                  <span>{quickViewProduct.condition}</span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold font-display text-[#141210] leading-snug">
                  {quickViewProduct.name}
                </h2>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-bold text-[#141210] tabular-nums">
                    ${quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="font-mono text-sm text-[#9E978E] line-through tabular-nums">
                      ${quickViewProduct.originalPrice}
                    </span>
                  )}
                  {quickViewProduct.stockCount <= 2 && (
                    <span className="ml-auto text-xs font-mono text-[#9E472A] font-semibold uppercase">
                      Only {quickViewProduct.stockCount} in stock
                    </span>
                  )}
                </div>

                <p className="mt-4 text-xs font-mono text-[#57524D] leading-relaxed line-clamp-3">
                  {quickViewProduct.description}
                </p>

                {/* Size Selector */}
                <div className="mt-6">
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-[#141210] font-semibold uppercase tracking-wider">Select Size</span>
                    <span className="text-[#7C5C3B]">Vintage sizing fits relaxed</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-[48px] py-2 px-3 text-xs font-mono font-bold uppercase transition-all ${
                          selectedSize === sz
                            ? 'bg-[#141210] text-[#FAF8F5]'
                            : 'bg-white border border-[#D9D2C7] text-[#141210] hover:border-[#141210]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Measurements Teaser */}
                <div className="mt-6 pt-4 border-t border-[#F2ECE3] text-[11px] font-mono text-[#736B63] space-y-1">
                  {quickViewProduct.measurements.pitToPit && (
                    <div className="flex justify-between">
                      <span>Chest (Pit-to-Pit):</span>
                      <span className="text-[#141210] font-medium">{quickViewProduct.measurements.pitToPit}</span>
                    </div>
                  )}
                  {quickViewProduct.measurements.length && (
                    <div className="flex justify-between">
                      <span>Length:</span>
                      <span className="text-[#141210] font-medium">{quickViewProduct.measurements.length}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Origin / Material:</span>
                    <span className="text-[#141210] font-medium">{quickViewProduct.origin} · {quickViewProduct.material}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 space-y-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#141210] hover:bg-[#2E2822] text-[#FAF8F5] py-3.5 px-6 text-xs font-bold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3.5 border transition-colors ${
                      wishlisted
                        ? 'bg-[#141210] text-red-400 border-[#141210]'
                        : 'bg-white text-[#141210] border-[#D9D2C7] hover:border-[#141210]'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-400 stroke-red-400' : ''}`} />
                  </button>
                </div>

                <Link
                  to={`/product/${quickViewProduct.id}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="block text-center text-xs font-mono uppercase tracking-wider text-[#7C5C3B] hover:text-[#141210] transition-colors py-1"
                >
                  View Full Archival Specs &amp; Details &rarr;
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
