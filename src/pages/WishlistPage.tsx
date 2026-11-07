import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, showToast } = useShop();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleQuickAdd = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const defaultSize = product.sizes[0];
    addToCart(product, defaultSize, 1);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-14 border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#E5DFD5] pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#7C5C3B] uppercase mb-1">
              <Heart className="w-3.5 h-3.5 fill-[#7C5C3B]" />
              <span>SAVED ARCHIVES</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[#141210]">
              Your Wishlist
            </h1>
          </div>
          <span className="text-xs font-mono text-[#736B63]">
            {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'piece saved' : 'pieces saved'}
          </span>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white border border-[#E5DFD5] p-12 sm:p-20 text-center max-w-xl mx-auto my-8">
            <Heart className="w-12 h-12 text-[#D9D2C7] mx-auto mb-4 stroke-1" />
            <h2 className="font-display font-black text-2xl uppercase tracking-wider text-[#141210] mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs font-mono text-[#736B63] leading-relaxed mb-6">
              You haven't saved any archival pieces yet. Browse our current drops and tap the heart icon on any piece to save it to your personal vault.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#141210] hover:bg-[#2E2822] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest px-6 py-3.5 transition-colors"
            >
              <span>Explore The Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#EBE5DB] flex flex-col justify-between group hover:border-[#141210] transition-colors"
              >
                <div className="relative aspect-[3/4] bg-[#F3EFEA] overflow-hidden">
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <ImageWithFallback
                      src={product.primaryImage}
                      alt={product.name}
                      aspectRatioClass="aspect-[3/4]"
                      categoryHint={product.category}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-red-500 rounded-full shadow-sm"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#7C5C3B] uppercase mb-1">
                      <span>{product.category}</span>
                      <span>·</span>
                      <span>{product.era}</span>
                    </div>

                    <Link
                      to={`/product/${product.id}`}
                      className="font-semibold text-sm text-[#141210] hover:text-[#7C5C3B] transition-colors line-clamp-2"
                    >
                      {product.name}
                    </Link>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F2ECE3]">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="font-mono text-base font-bold text-[#141210]">
                        ${product.price}
                      </span>
                      <span className="text-[11px] font-mono text-[#8C8378]">
                        Sizes: {product.sizes.join(', ')}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickAdd(product.id)}
                        className="flex-1 bg-[#141210] hover:bg-[#2E2822] text-[#FAF8F5] py-2.5 px-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>

                      <Link
                        to={`/product/${product.id}`}
                        className="p-2.5 border border-[#D9D2C7] hover:border-[#141210] text-[#141210] transition-colors"
                        aria-label="View product"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
