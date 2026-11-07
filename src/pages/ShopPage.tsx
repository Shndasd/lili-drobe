import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ArrowUpDown, Search, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCategory } from '../types';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial states from URL params
  const urlCategory = (searchParams.get('category') as ProductCategory) || 'All';
  const urlCondition = searchParams.get('condition') || 'All';
  const urlSort = searchParams.get('sort') || 'newest';
  const urlSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(urlCategory);
  const [selectedCondition, setSelectedCondition] = useState<string>(urlCondition);
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sortBy, setSortBy] = useState<string>(urlSort);
  const [searchQuery, setSearchQuery] = useState<string>(urlSearch);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state if URL changes
  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category') as ProductCategory);
    }
    if (searchParams.get('condition')) {
      setSelectedCondition(searchParams.get('condition') || 'All');
    }
    if (searchParams.get('search')) {
      setSearchQuery(searchParams.get('search') || '');
    }
    if (searchParams.get('sort')) {
      setSortBy(searchParams.get('sort') || 'newest');
    }
  }, [searchParams]);

  const categories: ProductCategory[] = [
    'All',
    'Baby Tees & Tops',
    'Leather & Jackets',
    'Denim & Bottoms',
    'Dresses & Skirts',
    'Hoodies & Knits',
    'Bags & Accessories',
  ];

  const conditions = [
    'All',
    'Deadstock Vintage',
    'Vintage Archive',
    'Excellent Vintage',
    'Like New',
    'Good',
  ];

  const sizes = ['All', 'XS', 'S', 'M', 'L', '24', '25', '26', '27', '28', '30', 'One Size'];

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedCondition('All');
    setSelectedSize('All');
    setMaxPrice(500);
    setSearchQuery('');
    setSortBy('newest');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Condition match
      if (selectedCondition !== 'All' && product.condition !== selectedCondition) {
        return false;
      }
      // Size match
      if (selectedSize !== 'All' && !product.sizes.includes(selectedSize)) {
        return false;
      }
      // Price match
      if (product.price > maxPrice) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesEra = product.era.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesEra && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      if (sortBy === 'rare') return (b.isRarePiece ? 1 : 0) - (a.isRarePiece ? 1 : 0);
      // default: newest
      return (b.isNewDrop ? 1 : 0) - (a.isNewDrop ? 1 : 0);
    });
  }, [selectedCategory, selectedCondition, selectedSize, maxPrice, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedCondition !== 'All' ||
    selectedSize !== 'All' ||
    maxPrice < 500 ||
    searchQuery.trim() !== '';

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12 border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Breadcrumb */}
        <div className="border-b border-[#E5DFD5] pb-6 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#7C5C3B] uppercase mb-2">
            <span>CATALOG</span>
            <span>/</span>
            <span>{selectedCategory}</span>
            {hasActiveFilters && (
              <>
                <span>/</span>
                <span className="text-[#141210]">FILTERED</span>
              </>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[#141210]">
                {selectedCategory === 'All' ? 'Complete Archive Catalog' : selectedCategory}
              </h1>
              <p className="text-xs font-mono text-[#736B63] mt-1">
                Showing {filteredProducts.length} of {PRODUCTS.length} curated vintage pieces.
              </p>
            </div>

            {/* Mobile Filter Toggle & Quick Sort */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 bg-white border border-[#D9D2C7] px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-[#141210]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {hasActiveFilters && '(Active)'}</span>
              </button>

              <div className="flex items-center gap-2 bg-white border border-[#D9D2C7] px-3 py-1.5 text-xs font-mono">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#7C5C3B]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-mono uppercase text-[#141210] focus:outline-none cursor-pointer"
                >
                  <option value="newest">Sort: New Drops First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popular">Most Coveted</option>
                  <option value="rare">Rare Grails</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Bar */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-3.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#141210] text-[#FAF8F5] border-[#141210] font-bold'
                    : 'bg-white text-[#57524D] border-[#E5DFD5] hover:border-[#141210] hover:text-[#141210]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Layout Grid (Sidebar Filters Left, Product Grid Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filters Sidebar (and Mobile Drawer) */}
          <aside
            className={`lg:col-span-3 lg:block ${
              isMobileFilterOpen ? 'block' : 'hidden'
            } bg-white lg:bg-transparent p-6 lg:p-0 border lg:border-0 border-[#E5DFD5] space-y-8`}
          >
            {/* Search Filter */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141210] mb-2">
                Search Archive
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="KEYWORDS (e.g. 1994, HOODIE)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#D9D2C7] px-3 py-2 pr-8 text-xs font-mono uppercase focus:outline-none focus:border-[#141210]"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-[#9E978E] hover:text-[#141210]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Search className="w-3.5 h-3.5 text-[#9E978E] absolute right-2.5 top-2.5" />
                )}
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141210] mb-2">
                Garment Condition
              </label>
              <div className="space-y-1.5">
                {conditions.map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setSelectedCondition(cond)}
                    className={`w-full text-left py-1.5 px-2.5 text-xs font-mono transition-colors flex items-center justify-between ${
                      selectedCondition === cond
                        ? 'bg-[#141210] text-[#FAF8F5] font-bold'
                        : 'text-[#57524D] hover:bg-[#F4EFE6] hover:text-[#141210]'
                    }`}
                  >
                    <span>{cond}</span>
                    {cond !== 'All' && (
                      <span className="text-[10px] opacity-75">
                        {PRODUCTS.filter((p) => p.condition === cond).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#141210]">
                  Available Sizes
                </label>
                {selectedSize !== 'All' && (
                  <button
                    type="button"
                    onClick={() => setSelectedSize('All')}
                    className="text-[10px] font-mono text-[#7C5C3B] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs font-mono text-center font-bold uppercase transition-all ${
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

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <label className="font-bold uppercase tracking-wider text-[#141210]">
                  Max Price
                </label>
                <span className="font-bold text-[#141210] tabular-nums">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="60"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#141210] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#8C8378] mt-1">
                <span>$60</span>
                <span>$500+</span>
              </div>
            </div>

            {/* Reset All Filters Button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="w-full border border-[#D9D2C7] bg-white hover:bg-[#F3EFEA] text-[#141210] py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#7C5C3B]" />
                <span>Reset All Filters</span>
              </button>
            )}

            {/* Close button for mobile filter */}
            <div className="lg:hidden pt-4 border-t border-[#E5DFD5]">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#141210] text-[#FAF8F5] py-3 text-xs font-bold uppercase tracking-widest"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </aside>

          {/* Product Grid Right */}
          <main className="lg:col-span-9">
            
            {/* Active Filters Bar */}
            {hasActiveFilters && (
              <div className="mb-6 bg-[#F4EFE6] border border-[#E3DACB] p-3 flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-[#7C5C3B] uppercase font-bold text-[11px]">ACTIVE:</span>
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 border border-[#D9D2C7]">
                    Category: {selectedCategory}
                    <button type="button" onClick={() => setSelectedCategory('All')}>
                      <X className="w-3 h-3 text-[#9E978E] hover:text-[#141210]" />
                    </button>
                  </span>
                )}
                {selectedCondition !== 'All' && (
                  <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 border border-[#D9D2C7]">
                    Condition: {selectedCondition}
                    <button type="button" onClick={() => setSelectedCondition('All')}>
                      <X className="w-3 h-3 text-[#9E978E] hover:text-[#141210]" />
                    </button>
                  </span>
                )}
                {selectedSize !== 'All' && (
                  <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 border border-[#D9D2C7]">
                    Size: {selectedSize}
                    <button type="button" onClick={() => setSelectedSize('All')}>
                      <X className="w-3 h-3 text-[#9E978E] hover:text-[#141210]" />
                    </button>
                  </span>
                )}
                {maxPrice < 500 && (
                  <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 border border-[#D9D2C7]">
                    Max: ${maxPrice}
                    <button type="button" onClick={() => setMaxPrice(500)}>
                      <X className="w-3 h-3 text-[#9E978E] hover:text-[#141210]" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 border border-[#D9D2C7]">
                    Query: "{searchQuery}"
                    <button type="button" onClick={() => setSearchQuery('')}>
                      <X className="w-3 h-3 text-[#9E978E] hover:text-[#141210]" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-auto text-[11px] text-[#9E472A] hover:underline uppercase font-bold"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#E5DFD5] p-12 text-center my-8">
                <span className="font-display font-black text-2xl uppercase tracking-wider text-[#141210] block mb-2">
                  No Archive Pieces Matched
                </span>
                <p className="text-xs font-mono text-[#736B63] max-w-md mx-auto mb-6">
                  We couldn't find any garments matching your exact combination of category, condition, and price filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="bg-[#141210] hover:bg-[#2E2822] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};
