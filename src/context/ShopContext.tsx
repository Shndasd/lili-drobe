import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ToastMessage } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartSubtotal: number;
  cartItemCount: number;
  shippingCost: number;
  discountAmount: number;
  finalTotal: number;
  appliedPromo: { code: string; discountPercent: number } | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'lilidrobe_cart_v1';
const WISHLIST_STORAGE_KEY = 'lilidrobe_wishlist_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize Cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Initialize Wishlist from localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Error saving cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Error saving wishlist to localStorage', e);
    }
  }, [wishlist]);

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev.slice(-3), newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, size: string, quantity = 1) => {
    if (!size) {
      showToast('Select a Size', 'Please choose your size before adding to bag.', 'info');
      return;
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.stockCount),
        };
        return updated;
      } else {
        return [...prev, { product, selectedSize: size, quantity }];
      }
    });

    showToast('Added to Bag', `${product.name} (Size: ${size})`, 'success');
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
    showToast('Removed from Bag', 'Piece removed from your shopping bag', 'info');
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize === size) {
          return {
            ...item,
            quantity: Math.min(quantity, item.product.stockCount),
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', product ? product.name : undefined, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', product ? product.name : undefined, 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LILIDROBE10' || clean === 'ARCHIVE10') {
      setAppliedPromo({ code: clean, discountPercent: 10 });
      showToast('Code Applied', '10% Archive discount activated!', 'success');
      return { success: true, message: '10% Archive discount applied' };
    } else if (clean === 'FIRSTDROP15') {
      setAppliedPromo({ code: clean, discountPercent: 15 });
      showToast('Code Applied', '15% First Drop discount activated!', 'success');
      return { success: true, message: '15% First Drop discount applied' };
    } else {
      showToast('Invalid Code', 'Try code "LILIDROBE10" or "FIRSTDROP15"', 'error');
      return { success: false, message: 'Promo code is not recognized or expired' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo Removed', 'Discount has been removed', 'info');
  };

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Free shipping over $150 or if cart is empty
  const shippingCost = cartSubtotal >= 150 || cartSubtotal === 0 ? 0 : 15;

  const discountAmount = appliedPromo
    ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100)
    : 0;

  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        cartSubtotal,
        cartItemCount,
        shippingCost,
        discountAmount,
        finalTotal,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
