import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Truck, CreditCard, ArrowLeft, Lock, ArrowRight, Package } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface OrderConfirmation {
  orderNumber: string;
  date: string;
  items: any[];
  shippingAddress: any;
  deliveryMethod: string;
  paymentMethod: string;
  total: number;
}

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, shippingCost, discountAmount, finalTotal, appliedPromo, clearCart, showToast } = useShop();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    email: 'alex.vance@archive.design',
    phone: '+1 (555) 392-1994',
  });

  const [shipping, setShipping] = useState({
    firstName: 'Alex',
    lastName: 'Vance',
    address: '420 Mercer Street, Loft 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10013',
    country: 'United States',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'whiteglove'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cod'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    name: 'ALEX VANCE',
    expiry: '09/28',
    cvv: '892',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  // Delivery options adjustment
  const deliverySurcharge = deliveryMethod === 'standard' ? 0 : deliveryMethod === 'express' ? 25 : 45;
  const calculatedTotal = finalTotal + deliverySurcharge;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      showToast('Empty Bag', 'Add pieces to your bag before checking out.', 'error');
      return;
    }

    if (!shipping.firstName || !shipping.address || !shipping.city || !shipping.postalCode) {
      showToast('Incomplete Address', 'Please fill in all required shipping fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate realistic payment authorization & stock confirmation
    setTimeout(() => {
      const orderNumber = `LD-${Math.floor(100000 + Math.random() * 900000)}`;
      const confirmation: OrderConfirmation = {
        orderNumber,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        items: [...cart],
        shippingAddress: { ...shipping },
        deliveryMethod:
          deliveryMethod === 'standard'
            ? 'Standard Insured Dispatch (3-5 days)'
            : deliveryMethod === 'express'
            ? 'Express Air Courier (1-2 days)'
            : 'White Glove Vault Hand Delivery',
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card ending in 4242'
            : paymentMethod === 'applepay'
            ? 'Apple Pay (Demo)'
            : 'Cash / Transfer on Delivery',
        total: calculatedTotal,
      };

      setConfirmedOrder(confirmation);
      clearCart();
      setIsSubmitting(false);
      showToast('Order Confirmed', `Order #${orderNumber} placed successfully!`, 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // If order is confirmed, display the Confirmation Screen
  if (confirmedOrder) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20 border-b border-[#E5DFD5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#E5DFD5] p-8 sm:p-12 shadow-sm text-center">
            
            <div className="w-16 h-16 bg-[#141210] text-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#7C5C3B] block mb-2">
              DISPATCH CONFIRMED
            </span>

            <h1 className="font-display font-black text-3xl sm:text-4xl uppercase text-[#141210] tracking-tight mb-2">
              Thank You for Your Order
            </h1>

            <p className="text-xs font-mono text-[#736B63] mb-6">
              Order Reference: <strong className="text-[#141210] font-bold">{confirmedOrder.orderNumber}</strong> · Placed {confirmedOrder.date}
            </p>

            <div className="bg-[#F8F5EE] border border-[#EBE4D8] p-4 text-xs font-mono text-[#57524D] text-left mb-8 space-y-2">
              <div className="flex justify-between">
                <span>Shipping to:</span>
                <span className="font-semibold text-[#141210] text-right">
                  {confirmedOrder.shippingAddress.firstName} {confirmedOrder.shippingAddress.lastName}, {confirmedOrder.shippingAddress.address}, {confirmedOrder.shippingAddress.city} {confirmedOrder.shippingAddress.postalCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Method:</span>
                <span className="font-semibold text-[#141210]">{confirmedOrder.deliveryMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment:</span>
                <span className="font-semibold text-[#141210]">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5DFD5] text-sm font-bold text-[#141210]">
                <span>Total Paid:</span>
                <span className="font-mono">${confirmedOrder.total}</span>
              </div>
            </div>

            {/* Itemized Recap */}
            <div className="text-left mb-8 border-t border-[#E5DFD5] pt-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#141210] mb-4">
                Pieces Secured:
              </h3>
              <div className="divide-y divide-[#F2ECE3]">
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 bg-[#EFEAE2] border border-[#E5DFD5] overflow-hidden">
                        <ImageWithFallback
                          src={item.product.primaryImage}
                          alt={item.product.name}
                          aspectRatioClass="aspect-[4/5]"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-[#141210] block line-clamp-1">{item.product.name}</span>
                        <span className="text-[#7C5C3B] text-[11px]">Size: {item.selectedSize} · Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#141210] tabular-nums">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="bg-[#141210] hover:bg-[#2E2822] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors"
              >
                Browse Next Drop
              </Link>
              <Link
                to="/"
                className="bg-transparent border border-[#141210] text-[#141210] text-xs font-bold uppercase tracking-widest px-8 py-3.5 hover:bg-[#F3EFEA] transition-colors"
              >
                Return Home
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Normal Checkout Form
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12 border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5DFD5]">
          <Link
            to="/shop"
            className="flex items-center gap-1.5 text-xs font-mono text-[#57524D] hover:text-[#141210] uppercase font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Catalog</span>
          </Link>
          <span className="font-display font-black text-xl tracking-[0.2em] uppercase text-[#141210]">
            LILI DROBE CHECKOUT
          </span>
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-800">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">256-bit Encrypted</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white border border-[#E5DFD5] p-12 text-center max-w-lg mx-auto">
            <Package className="w-12 h-12 text-[#C4B9A7] mx-auto mb-4 stroke-1" />
            <h2 className="font-display font-bold text-2xl uppercase text-[#141210] mb-2">
              Your Bag is Empty
            </h2>
            <p className="text-xs font-mono text-[#736B63] mb-6">
              You need at least one vintage piece in your bag to proceed through checkout.
            </p>
            <Link
              to="/shop"
              className="bg-[#141210] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest px-6 py-3"
            >
              Shop The Drop
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Form Steps Left */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Customer Contact */}
              <div className="bg-white border border-[#E5DFD5] p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4 border-b border-[#F2ECE3] pb-3">
                  <h3 className="font-display font-bold text-base uppercase tracking-wider text-[#141210] flex items-center gap-2">
                    <span className="font-mono text-xs bg-[#141210] text-white px-2 py-0.5">01</span>
                    <span>Contact Information</span>
                  </h3>
                  <span className="text-[11px] font-mono text-[#7C5C3B]">DEMO CHECKOUT</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-[#141210] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D9D2C7] p-2.5 text-xs font-mono focus:outline-none focus:border-[#141210]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-[#141210] mb-1">
                      Phone Number (For Courier Tracking)
                    </label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D9D2C7] p-2.5 text-xs font-mono focus:outline-none focus:border-[#141210]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Destination */}
              <div className="bg-white border border-[#E5DFD5] p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4 border-b border-[#F2ECE3] pb-3">
                  <h3 className="font-display font-bold text-base uppercase tracking-wider text-[#141210] flex items-center gap-2">
                    <span className="font-mono text-xs bg-[#141210] text-white px-2 py-0.5">02</span>
                    <span>Shipping Address</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-[#141210] mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shipping.firstName}
                      onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D9D2C7] p-2.5 text-xs font-mono focus:outline-none focus:border-[#141210]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-[#141210] mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shipping.lastName}
                      onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D9D2C7] p-2.5 text-xs font-mono focus:outline-none focus:border-[#141210]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono font-bold uppercase text-[#141210] mb-1">
                      Street Address &amp; Apartment / Loft *
                    </label>
                    <input
                      type="text"
                      required
                      value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D9D2C7] p-2.5 text-xs font-mono focus:outline-none focus:border-[#141210]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-[#141210] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={shipping.city}
                      onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D9D2C7] p-2.5 text-xs font-mono focus:outline-none focus:border-[#141210]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase text-[#141210] mb-1">
                        State / Province
                      </label>
                      <input
                        type="text"
                        value={shipping.state}
                        onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#D9D2C7] p-2.5 text-xs font-mono focus:outline-none focus:border-[#141210]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase text-[#141210] mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={shipping.postalCode}
                        onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#D9D2C7] p-2.5 text-xs font-mono focus:outline-none focus:border-[#141210]"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono font-bold uppercase text-[#141210] mb-1">
                      Country / Territory
                    </label>
                    <select
                      value={shipping.country}
                      onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D9D2C7] p-2.5 text-xs font-mono uppercase focus:outline-none focus:border-[#141210]"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Japan">Japan</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Delivery Method */}
              <div className="bg-white border border-[#E5DFD5] p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4 border-b border-[#F2ECE3] pb-3">
                  <h3 className="font-display font-bold text-base uppercase tracking-wider text-[#141210] flex items-center gap-2">
                    <span className="font-mono text-xs bg-[#141210] text-white px-2 py-0.5">03</span>
                    <span>Delivery Courier</span>
                  </h3>
                </div>

                <div className="space-y-3">
                  <label
                    className={`block p-4 border cursor-pointer transition-all ${
                      deliveryMethod === 'standard'
                        ? 'border-[#141210] bg-[#FAF8F5] ring-1 ring-[#141210]'
                        : 'border-[#D9D2C7] hover:border-[#141210]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryMethod === 'standard'}
                          onChange={() => setDeliveryMethod('standard')}
                          className="accent-[#141210]"
                        />
                        <div>
                          <span className="font-mono text-xs font-bold text-[#141210] uppercase block">
                            Standard Insured Archive Dispatch (3-5 Business Days)
                          </span>
                          <span className="text-[11px] font-mono text-[#736B63]">
                            Insured tracked shipping with signature on delivery
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#141210]">
                        {shippingCost === 0 ? 'FREE' : `$${shippingCost}`}
                      </span>
                    </div>
                  </label>

                  <label
                    className={`block p-4 border cursor-pointer transition-all ${
                      deliveryMethod === 'express'
                        ? 'border-[#141210] bg-[#FAF8F5] ring-1 ring-[#141210]'
                        : 'border-[#D9D2C7] hover:border-[#141210]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryMethod === 'express'}
                          onChange={() => setDeliveryMethod('express')}
                          className="accent-[#141210]"
                        />
                        <div>
                          <span className="font-mono text-xs font-bold text-[#141210] uppercase block">
                            Express Air Courier (1-2 Business Days)
                          </span>
                          <span className="text-[11px] font-mono text-[#736B63]">
                            Priority air transport via DHL Express Archive
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#141210]">+$25</span>
                    </div>
                  </label>

                  <label
                    className={`block p-4 border cursor-pointer transition-all ${
                      deliveryMethod === 'whiteglove'
                        ? 'border-[#141210] bg-[#FAF8F5] ring-1 ring-[#141210]'
                        : 'border-[#D9D2C7] hover:border-[#141210]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryMethod === 'whiteglove'}
                          onChange={() => setDeliveryMethod('whiteglove')}
                          className="accent-[#141210]"
                        />
                        <div>
                          <span className="font-mono text-xs font-bold text-[#141210] uppercase block">
                            White-Glove Garment Bag Courier (24 Hours)
                          </span>
                          <span className="text-[11px] font-mono text-[#736B63]">
                            Delivered in breathable cotton garment bag &amp; wooden hanger
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#141210]">+$45</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 4: Payment Simulation */}
              <div className="bg-white border border-[#E5DFD5] p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4 border-b border-[#F2ECE3] pb-3">
                  <h3 className="font-display font-bold text-base uppercase tracking-wider text-[#141210] flex items-center gap-2">
                    <span className="font-mono text-xs bg-[#141210] text-white px-2 py-0.5">04</span>
                    <span>Payment Method</span>
                  </h3>
                  <span className="text-[10px] font-mono text-[#7C5C3B] uppercase">SIMULATED ENCRYPTION</span>
                </div>

                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase border transition-colors flex items-center justify-center gap-2 ${
                      paymentMethod === 'card'
                        ? 'bg-[#141210] text-[#FAF8F5] border-[#141210]'
                        : 'bg-white text-[#141210] border-[#D9D2C7]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase border transition-colors flex items-center justify-center gap-2 ${
                      paymentMethod === 'applepay'
                        ? 'bg-[#141210] text-[#FAF8F5] border-[#141210]'
                        : 'bg-white text-[#141210] border-[#D9D2C7]'
                    }`}
                  >
                    <span>Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase border transition-colors flex items-center justify-center gap-2 ${
                      paymentMethod === 'cod'
                        ? 'bg-[#141210] text-[#FAF8F5] border-[#141210]'
                        : 'bg-white text-[#141210] border-[#D9D2C7]'
                    }`}
                  >
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 bg-[#FAF8F5] p-4 border border-[#E5DFD5]">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase text-[#141210] mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        className="w-full bg-white border border-[#D9D2C7] p-2.5 text-xs font-mono focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label className="block text-[11px] font-mono font-bold uppercase text-[#141210] mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                          className="w-full bg-white border border-[#D9D2C7] p-2.5 text-xs font-mono focus:outline-none uppercase"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase text-[#141210] mb-1">
                          Expires
                        </label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full bg-white border border-[#D9D2C7] p-2.5 text-xs font-mono focus:outline-none text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'applepay' && (
                  <div className="p-6 bg-[#FAF8F5] border border-[#E5DFD5] text-center text-xs font-mono text-[#57524D]">
                    <p className="font-bold text-[#141210] mb-1">Apple Pay Simulated Checkout</p>
                    <p>Click "Authorize &amp; Place Order" below to trigger demo Touch ID authorization.</p>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-6 bg-[#FAF8F5] border border-[#E5DFD5] text-xs font-mono text-[#57524D] leading-relaxed">
                    <p className="font-bold text-[#141210] mb-1">Cash / Wire Upon Courier Delivery</p>
                    <p>Pay upon physical inspection when the courier delivers your archival parcel. Available for select metropolitan areas.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Sticky Order Summary Right */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#E5DFD5] p-6 sm:p-8 sticky top-24 space-y-6">
                
                <div className="flex items-baseline justify-between border-b border-[#F2ECE3] pb-3">
                  <h3 className="font-display font-bold text-base uppercase tracking-wider text-[#141210]">
                    Order Summary
                  </h3>
                  <span className="text-xs font-mono text-[#7C5C3B]">
                    {cart.reduce((s, i) => s + i.quantity, 0)} Items
                  </span>
                </div>

                {/* Items preview list */}
                <div className="divide-y divide-[#F2ECE3] max-h-72 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="py-3 flex gap-3 text-xs font-mono">
                      <div className="w-14 h-18 bg-[#EFEAE2] border border-[#E5DFD5] shrink-0 overflow-hidden">
                        <ImageWithFallback
                          src={item.product.primaryImage}
                          alt={item.product.name}
                          aspectRatioClass="aspect-[4/5]"
                          categoryHint={item.product.category}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#141210] line-clamp-1">{item.product.name}</h4>
                        <span className="text-[11px] text-[#7C5C3B] block">
                          Size: {item.selectedSize} · Qty: {item.quantity}
                        </span>
                        <span className="text-[10px] text-[#8C8378]">{item.product.era} · {item.product.condition}</span>
                      </div>
                      <span className="font-bold text-[#141210] tabular-nums">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculation Details */}
                <div className="space-y-2 border-t border-[#F2ECE3] pt-4 font-mono text-xs text-[#57524D]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#141210] font-semibold tabular-nums">${cartSubtotal}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-[#9E472A]">
                      <span>Discount ({appliedPromo.code})</span>
                      <span className="tabular-nums">-${discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Base</span>
                    <span className="text-[#141210] tabular-nums">
                      {shippingCost === 0 ? <strong className="text-emerald-700">COMPLIMENTARY</strong> : `$${shippingCost}`}
                    </span>
                  </div>
                  {deliverySurcharge > 0 && (
                    <div className="flex justify-between">
                      <span>Express Courier Add-on</span>
                      <span className="text-[#141210] tabular-nums">+${deliverySurcharge}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-[#E5DFD5] text-base font-bold text-[#141210]">
                    <span>Total Due</span>
                    <span className="font-mono text-xl tabular-nums">${calculatedTotal}</span>
                  </div>
                </div>

                {/* Submit Order CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#141210] hover:bg-[#2E2822] disabled:bg-[#8C8378] text-[#FAF8F5] py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing Vault Order...</span>
                    </div>
                  ) : (
                    <>
                      <span>Place Order · ${calculatedTotal}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-[11px] font-mono text-[#8C8378] text-center space-y-1">
                  <p>✓ All items are guaranteed 100% authentic archival vintage.</p>
                  <p>✓ No payment charged in demo simulation.</p>
                </div>

              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
