import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to Archive Drops', 'You will receive priority access 1 hour before every drop.', 'success');
  };

  return (
    <footer className="bg-[#141210] text-[#FAF8F5] pt-16 pb-12 border-t border-[#29241F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14 border-b border-[#29241F]">
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-[#C4B9A7] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                100% Authenticated Vintage
              </h5>
              <p className="text-xs font-mono text-[#9E978E] mt-1 leading-relaxed">
                Every stitch, tag, wash, and print is physically inspected and authenticated in our studio.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Truck className="w-5 h-5 text-[#C4B9A7] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                Worldwide Insured Shipping
              </h5>
              <p className="text-xs font-mono text-[#9E978E] mt-1 leading-relaxed">
                Complimentary insured delivery on orders over $150. Tracked and boxed in custom archival paper.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <RefreshCw className="w-5 h-5 text-[#C4B9A7] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                1-of-1 Curated Rarity
              </h5>
              <p className="text-xs font-mono text-[#9E978E] mt-1 leading-relaxed">
                No reproductions. No mass re-prints. When a piece is claimed, it is retired from circulation.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter & Brand Intro */}
        <div className="py-14 border-b border-[#29241F] grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <span className="font-display font-black text-3xl tracking-[0.22em] uppercase text-white block mb-4">
              LILI DROBE
            </span>
            <p className="text-xs font-mono text-[#A89E90] leading-relaxed max-w-md">
              A curated independent women's fashion archive operating at the intersection of 90s subcultures, Japanese denim culture, bias-cut silk slips, and modern architectural streetwear.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <h4 className="font-display font-bold text-lg uppercase tracking-wider text-white mb-2">
              Join The Drop Roster
            </h4>
            <p className="text-xs font-mono text-[#A89E90] mb-4">
              Receive private drop notifications 60 minutes before general release. Exclusive password-protected early access.
            </p>

            {subscribed ? (
              <div className="bg-[#241F1A] border border-[#423A30] p-4 flex items-center gap-3 text-xs font-mono text-[#D4C8B8]">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You're on the priority drop list. Check your inbox before Drop No. 10.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-lg">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL FOR EARLY ACCESS..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-[#1E1A16] border border-[#3D362C] px-4 py-3 text-xs font-mono uppercase text-[#FAF8F5] placeholder:text-[#6E6457] focus:outline-none focus:border-[#C4B9A7]"
                />
                <button
                  type="submit"
                  className="bg-[#FAF8F5] hover:bg-white text-[#141210] text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono">
          <div>
            <h6 className="font-bold text-[#FAF8F5] uppercase tracking-widest mb-4">The Archive</h6>
            <ul className="space-y-2.5 text-[#A89E90]">
              <li>
                <Link to="/shop?category=Baby+Tees+%26+Tops" className="hover:text-white transition-colors">
                  Baby Tees &amp; Tops
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Leather+%26+Jackets" className="hover:text-white transition-colors">
                  Leather &amp; Outerwear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Denim+%26+Bottoms" className="hover:text-white transition-colors">
                  Denim &amp; Cargos
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Dresses+%26+Skirts" className="hover:text-white transition-colors">
                  Slip Dresses &amp; Skirts
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Bags+%26+Accessories" className="hover:text-white transition-colors">
                  Baguette Bags &amp; Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-[#FAF8F5] uppercase tracking-widest mb-4">Curation &amp; Story</h6>
            <ul className="space-y-2.5 text-[#A89E90]">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About LILI DROBE
                </Link>
              </li>
              <li>
                <Link to="/about#condition-guide" className="hover:text-white transition-colors">
                  Condition Grading Scale
                </Link>
              </li>
              <li>
                <Link to="/about#sourcing" className="hover:text-white transition-colors">
                  Sourcing Standards
                </Link>
              </li>
              <li>
                <Link to="/about#tag-archive" className="hover:text-white transition-colors">
                  Vintage Tag Archive
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-[#FAF8F5] uppercase tracking-widest mb-4">Client Support</h6>
            <ul className="space-y-2.5 text-[#A89E90]">
              <li>
                <Link to="/about#shipping" className="hover:text-white transition-colors">
                  Shipping &amp; Customs
                </Link>
              </li>
              <li>
                <Link to="/about#returns" className="hover:text-white transition-colors">
                  Return Policies
                </Link>
              </li>
              <li>
                <Link to="/about#sizing" className="hover:text-white transition-colors">
                  Measurements &amp; Fit Guide
                </Link>
              </li>
              <li>
                <span className="text-[#6E6457]">Concierge: concierge@lilidrobe.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-[#FAF8F5] uppercase tracking-widest mb-4">Studio Coordinates</h6>
            <p className="text-[#A89E90] leading-relaxed mb-4">
              Archive Studio &amp; Showroom<br />
              Kojima &amp; London By Appointment<br />
              Open Thursday–Saturday
            </p>
            <div className="flex gap-4 text-[#A89E90]">
              <span className="hover:text-white cursor-pointer">IG: @lilidrobe</span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer">TK: @lilidrobe</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#29241F] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#736B63]">
          <div>
            &copy; {new Date().getFullYear()} LILI DROBE ARCHIVE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>CURRENCY: USD ($)</span>
            <span>·</span>
            <span>GLOBAL DISPATCH</span>
            <span>·</span>
            <span>PREMIUM PACKAGING</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
