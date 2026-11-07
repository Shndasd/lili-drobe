import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from './ImageWithFallback';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    shippingCost,
    discountAmount,
    finalTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 150;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141210]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E5DFD5] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5DFD5] flex items-center justify-between bg-white">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-lg tracking-wider uppercase text-[#141210]">
                Shopping Bag
              </span>
              <span className="text-xs font-mono text-[#7C5C3B]">
                ({cart.reduce((s, i) => s + i.quantity, 0)} {cart.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-[#57524D] hover:text-[#141210] transition-colors rounded-full hover:bg-[#F3EFEA]"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Meter */}
          <div className="bg-[#F4EFE6] px-6 py-3 border-b border-[#E5DFD5] text-xs font-mono">
            {amountToFreeShipping > 0 ? (
              <div>
                <p className="text-[#57524D] mb-1.5">
                  Add <span className="font-bold text-[#141210]">${amountToFreeShipping}</span> more for complimentary shipping.
                </p>
                <div className="w-full bg-[#E3DACB] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#141210] h-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[#141210] font-semibold">
                <span className="text-[#7C5C3B]">✓</span>
                <span>You've unlocked Complimentary Worldwide Shipping!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EBE5DB]">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <span className="font-display font-black text-2xl tracking-wider text-[#C4B9A7] uppercase mb-2">
                  Bag is Empty
                </span>
                <p className="text-xs font-mono text-[#736B63] max-w-xs mb-6">
                  No pieces currently held in your session. Our drops are rare and move quickly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="bg-[#141210] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest py-3 px-6 hover:bg-[#2E2822] transition-colors"
                >
                  Explore The Archive
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.product.id}`}
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="w-20 h-26 shrink-0 bg-[#EFEAE2] border border-[#E5DFD5] overflow-hidden"
                  >
                    <ImageWithFallback
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      aspectRatioClass="aspect-[4/5]"
                      categoryHint={item.product.category}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="text-xs font-semibold text-[#141210] hover:text-[#7C5C3B] line-clamp-2 leading-snug"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-[#9E978E] hover:text-red-500 transition-colors p-0.5"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-[11px] font-mono text-[#7C5C3B]">
                        <span>SIZE: <span className="font-bold text-[#141210]">{item.selectedSize}</span></span>
                        <span>·</span>
                        <span className="text-[#8A8175]">{item.product.condition}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D9D2C7] bg-white">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          className="p-1 text-[#57524D] hover:text-[#141210] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold px-2.5 min-w-[24px] text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockCount}
                          className="p-1 text-[#57524D] hover:text-[#141210] disabled:opacity-30 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="font-mono text-xs font-bold text-[#141210] tabular-nums">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E5DFD5] space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-[#F4EFE6] px-3 py-2 text-xs font-mono border border-[#E0D8CB]">
                    <div className="flex items-center gap-1.5 text-[#141210]">
                      <Tag className="w-3.5 h-3.5 text-[#7C5C3B]" />
                      <span>CODE: <strong className="font-bold">{appliedPromo.code}</strong> (-{appliedPromo.discountPercent}%)</span>
                    </div>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-xs text-[#9E472A] hover:underline uppercase"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="PROMO CODE (e.g. LILIDROBE10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-[#FAF8F5] border border-[#D9D2C7] px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-[#141210]"
                    />
                    <button
                      type="submit"
                      className="bg-[#141210] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-[#2E2822] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMessage && !appliedPromo && (
                  <p className={`text-[11px] font-mono mt-1 ${promoMessage.isError ? 'text-[#9E472A]' : 'text-emerald-700'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Summary Calculations */}
              <div className="space-y-1.5 font-mono text-xs text-[#57524D] pt-2 border-t border-[#F2ECE3]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#141210] font-semibold tabular-nums">${cartSubtotal}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-[#9E472A]">
                    <span>Archive Discount ({appliedPromo.discountPercent}%)</span>
                    <span className="tabular-nums">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span className="text-[#141210] tabular-nums">
                    {shippingCost === 0 ? <strong className="text-emerald-700 font-bold">COMPLIMENTARY</strong> : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#141210] pt-2 border-t border-[#E5DFD5]">
                  <span>Total</span>
                  <span className="font-mono text-base tabular-nums">${finalTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full bg-[#141210] hover:bg-[#2E2822] text-[#FAF8F5] py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#8C8378]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7C5C3B]" />
                <span>Curated &amp; Authenticated Vintage Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
