import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, Sparkles, Check, ArrowRight } from 'lucide-react';
import { ARCHIVE_SHOWROOM_IMAGE, HERO_IMAGE, LEATHER_TRENCH_IMAGE, CROPPED_JACKET_IMAGE } from '../data/products';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen border-b border-[#E5DFD5]">
      
      {/* Editorial Header */}
      <section className="py-14 sm:py-20 border-b border-[#E5DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] text-[#7C5C3B] uppercase block">
            ESTABLISHED 2019 · ARCHIVE MANIFESTO
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#141210]">
            The Lili Drobe Philosophy
          </h1>
          <p className="font-body text-base sm:text-lg text-[#57524D] leading-relaxed max-w-2xl mx-auto pt-2">
            We source rare 1990s and Y2K women's garments from around the globe, giving historical textiles, bias-cut silks, and streetwear grails a permanent place in contemporary style.
          </p>
        </div>
      </section>

      {/* Large Showroom Visual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="relative aspect-[16/9] w-full border border-[#E5DFD5] overflow-hidden shadow-lg">
          <ImageWithFallback
            src={ARCHIVE_SHOWROOM_IMAGE}
            alt="LILI DROBE Women's Vintage Archive Showroom"
            aspectRatioClass="aspect-[16/9]"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-white/95 p-3 text-[11px] font-mono border border-[#E5DFD5]">
            SHOWROOM ARCHIVE VAULT · CURATED 1-OF-1 PIECES
          </div>
        </div>
      </section>

      {/* Core Narrative / Editorial Text */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14">
          
          <div className="md:col-span-4">
            <span className="text-xs font-mono tracking-widest text-[#7C5C3B] uppercase block mb-2">
              01 // THE ESSENCE
            </span>
            <h2 className="font-display font-extrabold text-2xl uppercase tracking-tight text-[#141210]">
              Clothing with a Pulse and a Past.
            </h2>
          </div>

          <div className="md:col-span-8 space-y-4 text-xs sm:text-sm font-body text-[#57524D] leading-relaxed">
            <p>
              In an era dominated by hyper-accelerated fast fashion and synthetic throwaways, LILI DROBE was conceived as an intentional sanctuary. We believe the golden era of garment construction occurred between 1988 and 2004 — a period when cotton was spun heavier, hardware was cast in solid brass, and graphic t-shirts were hand-screened with oil-based inks.
            </p>
            <p>
              Every garment in our catalog has been physically hunted down in secondary markets, estate sales, closed textile mills, and private collector archives spanning Los Angeles, Detroit, Osaka, and Northern Italy.
            </p>
            <p>
              When you purchase a piece from LILI DROBE, you are not buying an anonymous manufactured duplicate. You are acquiring a tangible artifact of youth subculture.
            </p>
          </div>

        </div>
      </section>

      {/* Sourcing Standards Grid */}
      <section id="sourcing" className="py-16 sm:py-20 bg-[#F6F3EE] border-y border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono tracking-[0.2em] text-[#7C5C3B] uppercase block mb-1">
              AUTHENTICATION PROTOCOL
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-[#141210]">
              How We Authenticate Every Garment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white border border-[#E5DFD5] p-6 space-y-3">
              <span className="font-mono text-xs text-[#7C5C3B] font-bold block">01 / STITCHING &amp; WEAVE</span>
              <h3 className="font-display font-bold text-base uppercase text-[#141210]">
                Single-Stitch &amp; Selvedge Loom Inspection
              </h3>
              <p className="text-xs font-mono text-[#57524D] leading-relaxed">
                Prior to 1996, tees were sewn with single-needle chainstitching along hem and cuffs. We inspect hem tension and verify vintage shuttle loom selvedge lines.
              </p>
            </div>

            <div className="bg-white border border-[#E5DFD5] p-6 space-y-3">
              <span className="font-mono text-xs text-[#7C5C3B] font-bold block">02 / TAG ARCHIVE &amp; ERA DATING</span>
              <h3 className="font-display font-bold text-base uppercase text-[#141210]">
                Original Woven Labels
              </h3>
              <p className="text-xs font-mono text-[#57524D] leading-relaxed">
                We cross-reference neck tags against our internal 3,000-sample catalog (Brockum, Giant, Murina, Spring Ford, Screen Stars) to ensure authentic era provenance.
              </p>
            </div>

            <div className="bg-white border border-[#E5DFD5] p-6 space-y-3">
              <span className="font-mono text-xs text-[#7C5C3B] font-bold block">03 / FABRIC DENSITY &amp; PATINA</span>
              <h3 className="font-display font-bold text-base uppercase text-[#141210]">
                Natural Sun-Fade &amp; Wash Testing
              </h3>
              <p className="text-xs font-mono text-[#57524D] leading-relaxed">
                True vintage fade is irregular and soft; artificial chemical washes leave harsh smells and brittle yarn. We only sell garments with organic natural patina.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Condition Grading Scale */}
      <section id="condition-guide" className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono tracking-[0.2em] text-[#7C5C3B] uppercase block mb-1">
            STANDARDS &amp; HONESTY
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-[#141210]">
            Condition Grading Scale
          </h2>
          <p className="text-xs font-mono text-[#736B63] mt-2">
            Every garment description reflects honest, meticulous grading. No surprises when unboxing.
          </p>
        </div>

        <div className="bg-white border border-[#E5DFD5] divide-y divide-[#EBE5DB]">
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4">
              <span className="font-display font-bold text-sm uppercase text-[#141210] block">
                Deadstock Vintage
              </span>
              <span className="text-[11px] font-mono text-[#7C5C3B]">GRADE A+</span>
            </div>
            <div className="md:col-span-8 text-xs font-mono text-[#57524D] leading-relaxed">
              Unworn vintage inventory preserved in pristine deadstock condition for decades. Often includes original tags, factory cardboard sizing clips, or deadstock stickers.
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4">
              <span className="font-display font-bold text-sm uppercase text-[#141210] block">
                Vintage Archive
              </span>
              <span className="text-[11px] font-mono text-[#7C5C3B]">GRADE A</span>
            </div>
            <div className="md:col-span-8 text-xs font-mono text-[#57524D] leading-relaxed">
              Collector-grade garment exhibiting authentic period wear: gentle wash fade, cracked rubberized ink prints, or soft fraying that elevates its character. No structural flaws.
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4">
              <span className="font-display font-bold text-sm uppercase text-[#141210] block">
                Excellent Vintage
              </span>
              <span className="text-[11px] font-mono text-[#7C5C3B]">GRADE A-</span>
            </div>
            <div className="md:col-span-8 text-xs font-mono text-[#57524D] leading-relaxed">
              Gently worn with vibrant colors, tight seams, and fully functional hardware. Ready to wear immediately with decades of life remaining.
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4">
              <span className="font-display font-bold text-sm uppercase text-[#141210] block">
                Like New
              </span>
              <span className="text-[11px] font-mono text-[#7C5C3B]">MODERN STOCK</span>
            </div>
            <div className="md:col-span-8 text-xs font-mono text-[#57524D] leading-relaxed">
              Modern stock or rare archive piece that has been tried on once or twice without showing any signs of wear, fading, or washing.
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4">
              <span className="font-display font-bold text-sm uppercase text-[#141210] block">
                Good (Distressed)
              </span>
              <span className="text-[11px] font-mono text-[#7C5C3B]">AUTHENTIC WORKWEAR</span>
            </div>
            <div className="md:col-span-8 text-xs font-mono text-[#57524D] leading-relaxed">
              Features deliberate battle scars: oil stains, carpenter paint splatters, vintage repairs, or micro-pinholes that tell an irreplaceable blue-collar story.
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-[#141210] text-[#FAF8F5] text-center border-t border-[#2B2723]">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display font-black text-3xl uppercase tracking-tight text-white mb-4">
            Ready to Discover Your Next Grail?
          </h3>
          <p className="text-xs font-mono text-[#A89E90] mb-8">
            Browse our current Drop No. 09. Once an archive piece sells, it is permanently retired.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#FAF8F5] hover:bg-white text-[#141210] text-xs font-bold uppercase tracking-widest px-8 py-4 transition-colors"
          >
            <span>Explore Current Drop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};
