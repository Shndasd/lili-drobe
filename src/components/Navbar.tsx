import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const { cartItemCount, cartSubtotal, wishlist, setIsCartDrawerOpen, setIsSearchOpen } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Vintage', path: '/shop?condition=Vintage+Archive' },
    { label: 'Stock', path: '/shop?category=Hoodies+%26+Sweatshirts' },
    { label: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('?')[0]);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-[#141210] text-[#FAF8F5] text-xs font-mono py-2 px-4 transition-all relative z-40 border-b border-[#2B2723]">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] tracking-widest uppercase">
            <span className="hidden sm:inline-block text-[#9E978E]">ARCHIVE DROP NO. 09</span>
            <div className="flex-1 text-center truncate px-2 font-medium">
              <span>COMPLIMENTARY WORLDWIDE DELIVERY OVER $150 · 1-OF-1 CURATED PIECES</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-block text-[#C4B9A7]">CODE: LILIDROBE10</span>
              <button
                type="button"
                onClick={() => setShowAnnouncement(false)}
                className="text-[#9E978E] hover:text-[#FAF8F5] transition-colors p-0.5"
                aria-label="Close announcement"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Navigation - Follows Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DFD5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            className="text-2xl font-black tracking-[0.22em] text-[#141210] hover:opacity-80 transition-opacity uppercase font-display whitespace-nowrap shrink-0"
          >
            LILI DROBE
          </Link>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.15em] uppercase text-[#38332E]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#141210] ${
                  isActive(link.path)
                    ? 'text-[#141210] font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#141210]'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Zone 3: Primary action zone (Search, Wishlist, Bag) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#141210] hover:text-[#7C5C3B] transition-colors rounded-full hover:bg-[#EFEAE2]"
              aria-label="Open search"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-2 text-[#141210] hover:text-[#7C5C3B] transition-colors rounded-full hover:bg-[#EFEAE2] relative"
              aria-label={`Wishlist with ${wishlist.length} items`}
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#7C5C3B] text-white text-[10px] font-mono font-bold flex items-center justify-center rounded-full leading-none">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag CTA */}
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#141210] hover:bg-[#2E2822] text-[#FAF8F5] py-2 px-3.5 sm:px-4 rounded-none transition-colors group cursor-pointer"
              aria-label={`Shopping bag with ${cartItemCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#FAF8F5]" />
              <span className="text-xs font-mono font-semibold tracking-wider">
                BAG ({cartItemCount})
              </span>
              {cartSubtotal > 0 && (
                <span className="hidden lg:inline-block text-xs font-mono text-[#D4C8B8] pl-1 border-l border-[#3D3730] tabular-nums">
                  ${cartSubtotal}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#141210] md:hidden rounded-full hover:bg-[#EFEAE2]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#FAF8F5] flex flex-col pt-18 px-6 pb-8 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex justify-between items-center pb-6 border-b border-[#E5DFD5]">
            <span className="font-display font-black text-xl tracking-[0.2em] uppercase">
              LILI DROBE
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#141210]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col py-8 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display font-bold text-2xl tracking-wider text-[#141210] hover:text-[#7C5C3B] uppercase flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-5 h-5 text-[#9E978E]" />
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-[#E5DFD5] flex flex-col gap-4 font-mono text-xs">
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-[#141210]"
            >
              <span>WISHLIST ARCHIVE</span>
              <span>({wishlist.length} SAVED)</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartDrawerOpen(true);
              }}
              className="w-full bg-[#141210] text-[#FAF8F5] py-3.5 text-center font-bold uppercase tracking-wider"
            >
              VIEW SHOPPING BAG ({cartItemCount})
            </button>
          </div>
        </div>
      )}
    </>
  );
};
