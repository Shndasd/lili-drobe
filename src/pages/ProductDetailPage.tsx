import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RefreshCw, Ruler, Check, Share2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useShop();

  const product = PRODUCTS.find((p) => p.id === id || p.slug === id);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'details' | 'measurements' | 'shipping'>('details');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-[#FAF8F5]">
        <span className="font-display font-black text-3xl uppercase tracking-wider text-[#141210] mb-2">
          Piece Not Found
        </span>
        <p className="text-xs font-mono text-[#736B63] max-w-sm mb-6">
          This archive garment may have been claimed by another collector or rotated from our current drop.
        </p>
        <Link
          to="/shop"
          className="bg-[#141210] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest px-6 py-3"
        >
          Return to Shop Catalog
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.primaryImage];
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.condition === product.condition)
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Select a Size', 'Please choose a size to add to your bag.', 'info');
      return;
    }
    addToCart(product, selectedSize, quantity);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', 'Product link copied to clipboard.', 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-6 sm:py-10 border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E5DFD5] text-xs font-mono">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#57524D] hover:text-[#141210] transition-colors uppercase font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-[#7C5C3B] uppercase">
            <Link to="/" className="hover:text-[#141210]">Home</Link>
            <span>/</span>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#141210]">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[#141210] font-bold truncate max-w-[200px]">{product.name}</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1 text-[#57524D] hover:text-[#141210] uppercase text-[11px]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* Product Hero Grid (Contiguous PDP Purchase Module) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Gallery Left (Sticky on desktop) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] w-full bg-white border border-[#E5DFD5] overflow-hidden shadow-sm">
              <ImageWithFallback
                src={images[activeImageIndex] || product.primaryImage}
                alt={product.name}
                aspectRatioClass="aspect-[3/4]"
                categoryHint={product.category}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Scarcity Tags */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isRarePiece && (
                  <span className="bg-[#141210] text-[#FAF8F5] text-[11px] font-mono uppercase tracking-wider px-2.5 py-1">
                    Rare Collector's Grail
                  </span>
                )}
                {product.stockCount <= 2 && (
                  <span className="bg-[#7C5C3B] text-[#FAF8F5] text-[11px] font-mono uppercase tracking-wider px-2.5 py-1">
                    Only {product.stockCount} in existence
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-24 shrink-0 border transition-all overflow-hidden ${
                      activeImageIndex === idx
                        ? 'border-[#141210] ring-2 ring-[#141210]/30'
                        : 'border-[#E5DFD5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`Angle ${idx + 1}`}
                      aspectRatioClass="aspect-[4/5]"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Purchase Module Right */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
            
            {/* Unboxed Metadata Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#7C5C3B] uppercase tracking-wider mb-2">
                <span>{product.category}</span>
                <span aria-hidden="true" className="text-[#C4B9A7]">·</span>
                <span>ERA {product.era}</span>
                <span aria-hidden="true" className="text-[#C4B9A7]">·</span>
                <span>{product.condition}</span>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-3xl text-[#141210] uppercase tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-mono text-3xl font-bold text-[#141210] tabular-nums">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="font-mono text-base text-[#9E978E] line-through tabular-nums">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-mono text-[#7C5C3B]">
                  (Taxes Included · Insured Dispatch)
                </span>
              </div>
            </div>

            {/* Short Narrative */}
            <p className="font-body text-xs sm:text-sm text-[#57524D] leading-relaxed border-t border-[#E5DFD5] pt-4">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="pt-2">
              <div className="flex justify-between items-center text-xs font-mono mb-2.5">
                <span className="font-bold uppercase tracking-wider text-[#141210]">
                  Available Size
                </span>
                <span className="text-[#7C5C3B]">Fits True to Vintage Era</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[56px] py-2.5 px-4 text-xs font-mono font-bold uppercase transition-all ${
                      selectedSize === sz
                        ? 'bg-[#141210] text-[#FAF8F5] shadow-sm'
                        : 'bg-white border border-[#D9D2C7] text-[#141210] hover:border-[#141210]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="font-bold uppercase tracking-wider text-[#141210]">Quantity:</span>
              <div className="flex items-center border border-[#D9D2C7] bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-[#57524D] hover:text-[#141210]"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-1.5 font-bold min-w-[32px] text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="px-3 py-1.5 text-[#57524D] hover:text-[#141210]"
                  disabled={quantity >= product.stockCount}
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-[#8C8378]">
                {product.stockCount} available
              </span>
            </div>

            {/* Purchase CTA Buttons */}
            <div className="pt-4 space-y-3">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#141210] hover:bg-[#2E2822] text-[#FAF8F5] py-4 px-6 text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag · ${product.price * quantity}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 border transition-all ${
                    wishlisted
                      ? 'bg-[#141210] text-red-400 border-[#141210]'
                      : 'bg-white text-[#141210] border-[#D9D2C7] hover:border-[#141210]'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-400 stroke-red-400' : ''}`} />
                </button>
              </div>
            </div>

            {/* Guarantees Strip */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#E5DFD5] text-[11px] font-mono text-[#57524D] text-center">
              <div>
                <ShieldCheck className="w-4 h-4 mx-auto text-[#7C5C3B] mb-1" />
                <span>Authenticated</span>
              </div>
              <div>
                <Truck className="w-4 h-4 mx-auto text-[#7C5C3B] mb-1" />
                <span>Complimentary &gt;$150</span>
              </div>
              <div>
                <RefreshCw className="w-4 h-4 mx-auto text-[#7C5C3B] mb-1" />
                <span>7-Day Return</span>
              </div>
            </div>

            {/* Editorial Information Tabs */}
            <div className="pt-2">
              <div className="flex border-b border-[#E5DFD5] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`py-2.5 px-4 uppercase font-bold tracking-wider transition-colors ${
                    activeTab === 'details'
                      ? 'border-b-2 border-[#141210] text-[#141210]'
                      : 'text-[#8C8378] hover:text-[#141210]'
                  }`}
                >
                  Details &amp; Craft
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('measurements')}
                  className={`py-2.5 px-4 uppercase font-bold tracking-wider transition-colors ${
                    activeTab === 'measurements'
                      ? 'border-b-2 border-[#141210] text-[#141210]'
                      : 'text-[#8C8378] hover:text-[#141210]'
                  }`}
                >
                  Measurements
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('shipping')}
                  className={`py-2.5 px-4 uppercase font-bold tracking-wider transition-colors ${
                    activeTab === 'shipping'
                      ? 'border-b-2 border-[#141210] text-[#141210]'
                      : 'text-[#8C8378] hover:text-[#141210]'
                  }`}
                >
                  Shipping &amp; Care
                </button>
              </div>

              <div className="py-4 text-xs font-mono text-[#57524D]">
                {activeTab === 'details' && (
                  <ul className="space-y-2">
                    {product.details.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#7C5C3B] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    <li className="pt-2 border-t border-[#F2ECE3] flex justify-between">
                      <span className="text-[#8C8378]">Origin:</span>
                      <span className="font-semibold text-[#141210]">{product.origin}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#8C8378]">Material:</span>
                      <span className="font-semibold text-[#141210]">{product.material}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#8C8378]">Colorway:</span>
                      <span className="font-semibold text-[#141210]">{product.color}</span>
                    </li>
                  </ul>
                )}

                {activeTab === 'measurements' && (
                  <div className="space-y-2.5">
                    <p className="text-[11px] text-[#8C8378] mb-3">
                      All garments are laid flat and measured by hand in inches and centimeters:
                    </p>
                    {product.measurements.pitToPit && (
                      <div className="flex justify-between py-1 border-b border-[#F2ECE3]">
                        <span>Chest (Pit-to-Pit):</span>
                        <span className="font-bold text-[#141210]">{product.measurements.pitToPit}</span>
                      </div>
                    )}
                    {product.measurements.length && (
                      <div className="flex justify-between py-1 border-b border-[#F2ECE3]">
                        <span>Back Length:</span>
                        <span className="font-bold text-[#141210]">{product.measurements.length}</span>
                      </div>
                    )}
                    {product.measurements.shoulder && (
                      <div className="flex justify-between py-1 border-b border-[#F2ECE3]">
                        <span>Shoulder Width:</span>
                        <span className="font-bold text-[#141210]">{product.measurements.shoulder}</span>
                      </div>
                    )}
                    {product.measurements.waist && (
                      <div className="flex justify-between py-1 border-b border-[#F2ECE3]">
                        <span>Waist:</span>
                        <span className="font-bold text-[#141210]">{product.measurements.waist}</span>
                      </div>
                    )}
                    {product.measurements.inseam && (
                      <div className="flex justify-between py-1 border-b border-[#F2ECE3]">
                        <span>Inseam:</span>
                        <span className="font-bold text-[#141210]">{product.measurements.inseam}</span>
                      </div>
                    )}
                    {product.measurements.legOpening && (
                      <div className="flex justify-between py-1 border-b border-[#F2ECE3]">
                        <span>Leg Opening:</span>
                        <span className="font-bold text-[#141210]">{product.measurements.legOpening}</span>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-3 leading-relaxed">
                    <p>
                      <strong>Dispatch:</strong> Dispatches within 24 hours from our London archive vault. All orders are packed in recycled archival kraft boxes with protective acid-free paper.
                    </p>
                    <p>
                      <strong>Care Protocol:</strong> Machine wash cold on delicate inside-out, or dry clean for heavy wool and leather. Hang dry in shade to preserve authentic vintage cotton drape.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-[#E5DFD5]">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-xs font-mono text-[#7C5C3B] uppercase tracking-wider block mb-1">
                  CURATED RECOMMENDATIONS
                </span>
                <h3 className="font-display font-extrabold text-2xl uppercase tracking-tight text-[#141210]">
                  Related Archive Pieces
                </h3>
              </div>
              <Link
                to="/shop"
                className="text-xs font-mono uppercase tracking-wider text-[#141210] hover:text-[#7C5C3B]"
              >
                View Full Archive &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
