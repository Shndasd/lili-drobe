import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ImageWithFallback } from './ImageWithFallback';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.era.toLowerCase().includes(q) ||
          p.condition.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
        );
      })
    : [];

  const popularSearches = ['Heavyweight Hoodie', 'Le Mans Leather', 'Carpenter Denim', '1994 Sonic Youth', 'Kojima Selvedge', 'Track Pants'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141210]/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />

      <div className="min-h-screen px-4 pt-16 pb-20 text-center flex flex-col items-center">
        <div className="w-full max-w-3xl bg-[#FAF8F5] border border-[#E5DFD5] shadow-2xl relative text-left overflow-hidden animate-in fade-in slide-in-from-top-6 duration-200">
          
          {/* Search Header Input */}
          <div className="p-4 sm:p-6 border-b border-[#E5DFD5] bg-white flex items-center gap-3">
            <Search className="w-6 h-6 text-[#7C5C3B] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="SEARCH BY ERA, BRAND, OR PIECE (e.g. 1996, HOODIE, DENIM)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent font-display text-base sm:text-lg font-bold tracking-wide uppercase text-[#141210] placeholder:text-[#A89E90] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs font-mono uppercase text-[#736B63] hover:text-[#141210]"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-[#57524D] hover:text-[#141210] rounded-full hover:bg-[#F3EFEA]"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Tags / Search Prompts */}
          <div className="px-6 py-3 bg-[#F4EFE6] border-b border-[#E5DFD5] flex items-center gap-2 overflow-x-auto text-xs font-mono">
            <span className="text-[#7C5C3B] shrink-0 uppercase">POPULAR:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="shrink-0 bg-white border border-[#D9D2C7] px-2.5 py-1 text-[11px] text-[#141210] hover:border-[#141210] transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {query.trim() === '' ? (
              <div className="py-12 text-center">
                <p className="font-display font-bold text-xl uppercase tracking-wider text-[#141210]">
                  LILI DROBE ARCHIVE SEARCH
                </p>
                <p className="text-xs font-mono text-[#736B63] mt-2 max-w-md mx-auto">
                  Search across 18 authenticated vintage garments, archival outerwear, rare graphic tees, and Japanese denim.
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-display font-bold text-lg uppercase text-[#9E472A]">
                  No matching archive pieces found
                </p>
                <p className="text-xs font-mono text-[#736B63] mt-2">
                  Try searching for general categories like "Jacket", "Denim", "Vintage", or "1994".
                </p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4 text-xs font-mono text-[#7C5C3B] uppercase">
                  <span>Found {filteredProducts.length} pieces</span>
                  <Link
                    to={`/shop?search=${encodeURIComponent(query)}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="hover:underline flex items-center gap-1"
                  >
                    <span>View all in Shop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="divide-y divide-[#EBE5DB]">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="py-3 flex items-center gap-4 hover:bg-white px-3 -mx-3 transition-colors group"
                    >
                      <div className="w-16 h-20 shrink-0 bg-[#EFEAE2] border border-[#E5DFD5] overflow-hidden">
                        <ImageWithFallback
                          src={product.primaryImage}
                          alt={product.name}
                          aspectRatioClass="aspect-[4/5]"
                          categoryHint={product.category}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-[#7C5C3B] uppercase">
                          <span>{product.category}</span>
                          <span>·</span>
                          <span>{product.era}</span>
                          <span>·</span>
                          <span>{product.condition}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-[#141210] group-hover:text-[#7C5C3B] transition-colors truncate">
                          {product.name}
                        </h4>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="font-mono text-xs font-bold text-[#141210]">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="font-mono text-[10px] text-[#9E978E] line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-xs font-mono text-[#9E978E] group-hover:text-[#141210] transition-colors shrink-0 flex items-center gap-1">
                        <span>VIEW</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-[#FAF8F5] border-t border-[#E5DFD5] text-center text-[10px] font-mono text-[#8C8378]">
            PRESS ESC TO CLOSE SEARCH
          </div>

        </div>
      </div>
    </div>
  );
};
