import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, ShieldCheck, Flame } from 'lucide-react';
import { PRODUCTS, CATEGORIES, HERO_IMAGE, LEATHER_TRENCH_IMAGE, CROPPED_JACKET_IMAGE, ARCHIVE_SHOWROOM_IMAGE } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const HomePage: React.FC = () => {
  const newArrivals = PRODUCTS.filter((p) => p.isNewDrop).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const rarePieces = PRODUCTS.filter((p) => p.isRarePiece).slice(0, 3);

  return (
    <div className="bg-[#FAF8F5]">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative border-b border-[#E5DFD5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6 z-10">
              
              <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#7C5C3B]">
                <span className="w-2 h-2 bg-[#7C5C3B] rounded-full" />
                <span>CURATED WOMEN'S VINTAGE &amp; STREETWEAR ARCHIVE</span>
                <span aria-hidden="true">·</span>
                <span>DROP NO. 09</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#141210] uppercase tracking-tight leading-[1.05]">
                NOT EVERY PIECE IS MADE TO BE ORDINARY.
              </h1>

              <p className="font-body text-base text-[#57524D] leading-relaxed max-w-xl">
                Hand-sourced 1990s women's streetwear, silk lace slip dresses, low-rise baggy cargos, cropped tour baby tees, and distressed matrix leather trenches. Each garment holds a distinct history, curated for the modern wardrobe.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/shop"
                  className="bg-[#141210] hover:bg-[#2E2822] text-[#FAF8F5] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-sm group"
                >
                  <span>Shop The Drop</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/shop?condition=Vintage+Archive"
                  className="bg-transparent hover:bg-[#F0EBE1] text-[#141210] border border-[#141210] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Vintage</span>
                </Link>
              </div>

              {/* Editorial Stat strip */}
              <div className="pt-6 border-t border-[#E5DFD5] grid grid-cols-3 gap-4 font-mono text-xs text-[#57524D]">
                <div>
                  <span className="block font-bold text-lg sm:text-xl text-[#141210] tabular-nums">18</span>
                  <span className="text-[10px] tracking-wider uppercase text-[#8C8378]">Curated Drops</span>
                </div>
                <div>
                  <span className="block font-bold text-lg sm:text-xl text-[#141210] tabular-nums">100%</span>
                  <span className="text-[10px] tracking-wider uppercase text-[#8C8378]">Authenticated</span>
                </div>
                <div>
                  <span className="block font-bold text-lg sm:text-xl text-[#141210] tabular-nums">1-OF-1</span>
                  <span className="text-[10px] tracking-wider uppercase text-[#8C8378]">No Replicas</span>
                </div>
              </div>

            </div>

            {/* Right Large Campaign Editorial Imagery */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden border border-[#E5DFD5] shadow-xl group">
                <ImageWithFallback
                  src={HERO_IMAGE}
                  alt="LILI DROBE Autumn Streetwear Editorial Campaign"
                  aspectRatioClass="aspect-[4/3]"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
                
                {/* Floating Editorial Stamp */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs p-3 border border-[#E5DFD5] max-w-[240px]">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#7C5C3B] block">
                    CAMPAIGN NO. 09
                  </span>
                  <span className="font-display font-bold text-xs uppercase text-[#141210] block mt-0.5">
                    1996 Oversized Heavy Cotton &amp; Distressed Denim
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 border-b border-[#E5DFD5] pb-4">
          <div>
            <span className="text-xs font-mono tracking-[0.2em] text-[#7C5C3B] uppercase block mb-1">
              CURATED DEPARTMENTS
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-[#141210]">
              Archive Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-mono uppercase tracking-wider text-[#141210] hover:text-[#7C5C3B] flex items-center gap-1.5 mt-2 sm:mt-0"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col bg-white border border-[#EBE5DB] hover:border-[#141210] transition-all p-2.5 hover:shadow-sm"
            >
              <div className="aspect-square w-full overflow-hidden bg-[#F3EFEA] mb-3">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  aspectRatioClass="aspect-square"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
              </div>
              <h3 className="font-display font-bold text-xs sm:text-sm text-[#141210] group-hover:text-[#7C5C3B] uppercase transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] font-mono text-[#8C8378] mt-0.5">
                {cat.count} PIECES
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. NEW ARRIVALS PRODUCT GRID */}
      <section className="py-14 sm:py-20 bg-[#F6F3EE] border-y border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 border-b border-[#E0D8CB] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#7C5C3B] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FRESHLY SOURCED ARCHIVES</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-[#141210]">
                New Arrivals · Drop 09
              </h2>
            </div>
            <Link
              to="/shop?sort=newest"
              className="text-xs font-mono uppercase tracking-wider text-[#141210] hover:text-[#7C5C3B] flex items-center gap-1.5 mt-2 sm:mt-0"
            >
              <span>See All New Arrivals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED COLLECTION EDITORIAL BANNER */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141210] text-[#FAF8F5] border border-[#2B2723] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            <div className="lg:col-span-7 relative min-h-[350px] lg:min-h-[500px]">
              <ImageWithFallback
                src={LEATHER_TRENCH_IMAGE}
                alt="1990s Distressed Matrix Leather Long Trench"
                aspectRatioClass="aspect-[4/3] lg:aspect-auto"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white text-[#141210] text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1">
                COLLECTOR'S VAULT
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono tracking-[0.2em] text-[#C4B9A7] uppercase block mb-3">
                  FEATURED SPOTLIGHT // 1994
                </span>
                
                <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight text-white mb-4">
                  1990s Distressed Matrix Leather Long Trench
                </h3>

                <p className="font-body text-xs sm:text-sm text-[#A89E90] leading-relaxed mb-6">
                  An iconic 90s heroine silhouette sourced from Milan. Full-length distressed buffalo leather with double-breasted horn buttons, storm flap, and removable belted waist. Naturally aged with rich caramel and espresso undertones.
                </p>

                <div className="space-y-2 border-y border-[#2E2822] py-4 text-xs font-mono text-[#D4C8B8]">
                  <div className="flex justify-between">
                    <span>Condition:</span>
                    <span className="text-white font-bold">Deadstock Vintage (Mint)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Provenance:</span>
                    <span className="text-white font-bold">Milan, Italy</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Circulation:</span>
                    <span className="text-white font-bold">1-of-1 Piece</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-mono text-[#8C8378] uppercase">Price</span>
                  <span className="font-mono text-2xl font-bold text-white tabular-nums">$520</span>
                </div>
                <Link
                  to="/product/ld-w01"
                  className="bg-[#FAF8F5] hover:bg-white text-[#141210] px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  <span>Inspect Piece</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS & COVETED ARCHIVES */}
      <section className="py-14 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 border-b border-[#E5DFD5] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#7C5C3B] uppercase tracking-wider mb-1">
                <Flame className="w-3.5 h-3.5 text-[#9E472A]" />
                <span>MOST COVETED SILHOUETTES</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-[#141210]">
                Best Sellers
              </h2>
            </div>
            <Link
              to="/shop?sort=popular"
              className="text-xs font-mono uppercase tracking-wider text-[#141210] hover:text-[#7C5C3B] flex items-center gap-1.5 mt-2 sm:mt-0"
            >
              <span>Explore All Popular</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. BRAND STORY / THE ARCHIVE PHILOSOPHY */}
      <section className="py-16 sm:py-24 bg-[#F4EFE6] border-t border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="aspect-[16/10] sm:aspect-[4/3] w-full bg-[#E5DFD5] border border-[#D9D2C7] overflow-hidden shadow-lg">
                <ImageWithFallback
                  src={ARCHIVE_SHOWROOM_IMAGE}
                  alt="LILI DROBE Vintage Archive Studio and Racks"
                  aspectRatioClass="aspect-[4/3]"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 flex justify-between text-[11px] font-mono text-[#7C5C3B]">
                <span>SHOWROOM ARCHIVE RACKS</span>
                <span>CURATED SINCE 2019</span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#7C5C3B] block">
                OUR PROVENANCE
              </span>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#141210] uppercase tracking-tight leading-tight">
                Authentic Vintage Outlasts Fast Fashion.
              </h2>

              <div className="space-y-4 text-xs sm:text-sm font-body text-[#57524D] leading-relaxed">
                <p>
                  At LILI DROBE, we reject disposable trend cycles. We hunt through estate archives, warehouse deadstock in Detroit and Osaka, and European motorsport clubs to bring you authentic pieces that carry real cultural weight.
                </p>
                <p>
                  Every garment undergoes a 5-step provenance check: single-stitch verification, cotton GSM density analysis, era tag authentication, hardware inspection, and precise manual measurement.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-[0.15em] text-[#141210] hover:text-[#7C5C3B] border-b border-[#141210] pb-1 transition-colors"
                >
                  <span>Read The Full Story &amp; Authentication Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
