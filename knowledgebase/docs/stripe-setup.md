# Stripe E-Commerce Integration Guide

Complete guide for the Stripe checkout implementation in this project.

## Overview

This project uses **Stripe Checkout** (Option 1 - Recommended) for secure payment processing. Stripe hosts the payment page, handling PCI compliance automatically.

### Features Implemented
- Shopping cart with localStorage persistence
- Stripe Checkout sessions
- Shipping address collection (9 countries)
- Success/cancel page handling
- Cart clearing after successful purchase

### Not Implemented (Optional)
- Webhooks for post-payment processing
- Inventory management (marking items sold)
- Custom confirmation emails
- Admin order dashboard

## Architecture

```
src/
├── contexts/
│   └── cart-context.tsx          # Cart state management
├── components/shop/
│   └── cart-drawer.tsx           # Slide-out cart UI
├── app/
│   ├── api/
│   │   └── create-checkout-session/
│   │       └── route.ts          # Stripe session creation
│   └── checkout/
│       ├── page.tsx              # Checkout page
│       ├── success/
│       │   └── page.tsx          # Success confirmation
│       └── cancel/
│           └── page.tsx          # Cancelled order
```

## Cart Context Pattern

### CartContext Implementation

```typescript
// src/contexts/cart-context.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Artwork, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((artwork: Artwork) => {
    setItems((currentItems) => {
      // Prevent duplicates for unique artworks
      const existingItem = currentItems.find(
        (item) => item.artwork.id === artwork.id
      );

      if (existingItem) {
        return currentItems; // Already in cart
      }

      return [...currentItems, { artwork, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((artworkId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.artwork.id !== artworkId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return items.reduce(
      (total, item) => total + (item.artwork.price || 0) * item.quantity,
      0
    );
  }, [items]);

  const getCartCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
```

### Layout Integration

```tsx
// src/app/layout.tsx
import { CartProvider } from '@/contexts/cart-context';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
```

## Stripe API Route

### Create Checkout Session

```typescript
// src/app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '@/types';

export async function POST(req: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
    });

    const { items }: { items: CartItem[] } = await req.json();

    // Create line items for Stripe
    const lineItems = items.map((item: CartItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.artwork.title,
          description: `${item.artwork.medium} - ${item.artwork.dimensions}`,
          images: [
            typeof item.artwork.image === 'string'
              ? item.artwork.image
              : `${process.env.NEXT_PUBLIC_SITE_URL}/images/artworks/default.jpg`,
          ],
          metadata: {
            artworkId: item.artwork.id,
            artist: 'Jennifer Watkins',
          },
        },
        unit_amount: Math.round((item.artwork.price || 0) * 100), // Cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'FR', 'DE', 'IT', 'ES', 'NL'],
      },
      metadata: {
        orderItems: JSON.stringify(
          items.map((item: CartItem) => ({
            id: item.artwork.id,
            title: item.artwork.title,
            price: item.artwork.price,
          }))
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
```

### Key Points

1. **Graceful Degradation:** Check if `STRIPE_SECRET_KEY` exists
2. **Image URLs:** Must be absolute URLs for Stripe
3. **Price Format:** Convert dollars to cents (multiply by 100)
4. **Metadata:** Store order info for reference
5. **Shipping:** Configure allowed countries

## Environment Variables

```env
# Required for shop functionality
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional (for webhooks)
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Getting Stripe Keys

1. Create account at [stripe.com](https://stripe.com)
2. Go to Developers → API Keys
3. Use **test mode** keys for development
4. Switch to **live mode** keys for production

## Checkout Flow

### 1. Add to Cart

```tsx
// In shop/portfolio pages
import { useCart } from '@/contexts/cart-context';

export function ArtworkCard({ artwork }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (artwork.available && artwork.price) {
      addToCart(artwork);
      // Optional: Show toast notification
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={!artwork.available || !artwork.price}
    >
      Add to Cart
    </Button>
  );
}
```

### 2. Cart Drawer

```tsx
// src/components/shop/cart-drawer.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/cart-context';

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, getCartTotal, getCartCount } = useCart();

  return (
    <>
      {/* Cart Button */}
      <button onClick={() => setIsOpen(true)}>
        Cart ({getCartCount()})
      </button>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50"
            >
              {/* Cart items... */}

              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                Proceed to Checkout
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
```

### 3. Checkout Page

```tsx
// src/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '@/contexts/cart-context';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const { items, getCartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const { url, error } = await response.json();

      if (error) throw new Error(error);

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {/* Order summary... */}
      <button onClick={handleCheckout} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Pay with Stripe'}
      </button>
    </div>
  );
}
```

### 4. Success Page

```tsx
// src/app/checkout/success/page.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/contexts/cart-context';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart after successful purchase
    clearCart();
  }, [clearCart]);

  return (
    <div>
      <h1>Thank You!</h1>
      <p>Your order has been confirmed.</p>
      {sessionId && <p>Order ID: {sessionId.slice(-10)}</p>}
    </div>
  );
}
```

## Testing

### Test Card Numbers

| Scenario | Card Number |
|----------|-------------|
| Success | `4242 4242 4242 4242` |
| Decline | `4000 0000 0000 0002` |
| Requires auth | `4000 0027 6000 3184` |

- **Expiry:** Any future date (e.g., 12/34)
- **CVC:** Any 3 digits
- **ZIP:** Any 5 digits

### Testing Checklist

- [ ] Add artwork to cart
- [ ] View cart drawer
- [ ] Remove items
- [ ] Complete checkout
- [ ] Test successful payment
- [ ] Test declined payment
- [ ] Verify success page clears cart
- [ ] Check Stripe Dashboard for orders

## Production Checklist

Before going live:

1. **Activate Stripe Account**
   - Complete identity verification
   - Add bank account for payouts

2. **Switch to Live Keys**
   ```env
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

3. **Update Site URL**
   ```env
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

4. **Configure Stripe Dashboard**
   - Upload logo in Settings → Branding
   - Enable email receipts
   - Configure shipping options

5. **Test Live Purchase**
   - Make small real purchase
   - Verify email receipt
   - Check order in dashboard

## Optional: Webhooks

Webhooks notify your app when payments complete. Useful for:
- Marking artworks as sold
- Sending custom emails
- Updating inventory

### Webhook Endpoint

```typescript
// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // TODO: Mark artwork as sold
      console.log('Payment successful:', session.id);
      break;
  }

  return NextResponse.json({ received: true });
}
```

### Stripe CLI for Local Testing

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Fees

- **Standard:** 2.9% + $0.30 per transaction (US)
- **No monthly fees**
- **Payouts:** 2-7 days to bank account

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid API Key" | Check `.env.local`, restart dev server |
| Images not showing | Use absolute URLs, not relative paths |
| "No such checkout session" | Check `NEXT_PUBLIC_SITE_URL` |
| Cart not persisting | Verify `CartProvider` in layout |
| CORS errors | Check Stripe key environment |

---

*See also: [Tech Stack](./tech-stack.md), [Project Structure](./project-structure.md)*
