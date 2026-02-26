# Error Handling Guide

Comprehensive error handling patterns for the project.

## Error Handling Philosophy

- **Graceful degradation** - App continues to work when possible
- **Clear user feedback** - Users always know what happened
- **Detailed logging** - Errors are logged for debugging
- **Recovery options** - Users can retry or navigate elsewhere

## Error Boundaries

### Global Error Page

**File:** `src/app/error.tsx`

```typescript
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif">Something went wrong</h1>
        <p className="text-muted-foreground">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### Not Found Page

**File:** `src/app/not-found.tsx`

```typescript
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-serif">404</h1>
        <h2 className="text-2xl">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
```

### Dynamic Route Not Found

```typescript
// src/app/portfolio/[slug]/page.tsx
import { notFound } from 'next/navigation';

export default async function ArtworkPage({ params }) {
  const artwork = await fetchArtwork(params.slug);

  if (!artwork) {
    notFound(); // Renders not-found.tsx
  }

  return <ArtworkDetail artwork={artwork} />;
}
```

## API Error Handling

### API Route Handler Pattern

```typescript
// src/app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Check prerequisites
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    const body = await req.json();

    // Validate input
    if (!body.items || !Array.isArray(body.items)) {
      return NextResponse.json(
        { error: 'Invalid request: items array required' },
        { status: 400 }
      );
    }

    // Process request
    const result = await processRequest(body);

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error('API Error:', error);

    // Determine error type
    const message = error instanceof Error
      ? error.message
      : 'An unexpected error occurred';

    const status = error instanceof ValidationError
      ? 400
      : error instanceof AuthenticationError
      ? 401
      : 500;

    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
```

### Error Types

```typescript
// Custom error classes
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
```

## Data Fetching Error Handling

### Server Component Pattern

```typescript
// src/app/page.tsx
import { sanityFetch } from '@/sanity/lib/live';
import { sampleArtworks } from '@/lib/sample-data';

export default async function HomePage() {
  let artworks;
  let error = null;

  try {
    const { data } = await sanityFetch({
      query: FEATURED_ARTWORKS_QUERY,
    });
    artworks = data?.map(transformArtwork);
  } catch (err) {
    console.error('Failed to fetch artworks:', err);
    error = 'Failed to load artworks';
    artworks = sampleArtworks.filter(a => a.featured);
  }

  return (
    <div>
      {error && (
        <ErrorBanner message={error} />
      )}
      <GalleryGrid artworks={artworks} />
    </div>
  );
}
```

### Client Component Pattern

```typescript
'use client';

import { useState, useEffect } from 'react';

export function ArtworkList() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArtworks() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/artworks');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArtworks(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load artworks'
        );
      } finally {
        setLoading(false);
      }
    }

    loadArtworks();
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error} retry={loadArtworks} />;

  return <Gallery artworks={artworks} />;
}
```

## Form Error Handling

### Form Validation Errors

```typescript
'use client';

import { useState } from 'react';

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (data: FormData) => {
    const errors: Record<string, string> = {};

    if (!data.name?.trim()) {
      errors.name = 'Name is required';
    }

    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Please enter a valid email';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    // Client-side validation
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }

      // Success
      setErrors({});
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Failed to send message. Please try again.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitError && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
          {submitError}
        </div>
      )}

      <div>
        <input name="name" />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}
      </div>

      <button type="submit">Send</button>
    </form>
  );
}
```

## Error UI Components

### Error Banner

```typescript
// src/components/ui/error-banner.tsx
import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

interface ErrorBannerProps {
  message: string;
  onDismiss?: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-red-700">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={() => {
            setIsVisible(false);
            onDismiss();
          }}
          className="text-red-500 hover:text-red-700"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
```

### Error Message with Retry

```typescript
interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="text-center py-12">
      <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
      <h3 className="text-lg font-medium mb-2">Error</h3>
      <p className="text-muted-foreground mb-4">{message}</p>
      {retry && (
        <Button onClick={retry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}
```

## Loading States

### Suspense Boundary

```typescript
// src/app/page.tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<GallerySkeleton />}>
        <GalleryGrid />
      </Suspense>
    </div>
  );
}
```

### Loading Skeleton

```typescript
// src/app/portfolio/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] bg-muted rounded-lg" />
            <div className="mt-4 h-4 bg-muted rounded w-3/4" />
            <div className="mt-2 h-4 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Error Logging

### Client-Side Error Logging

```typescript
// src/lib/error-logging.ts
export function logError(error: Error, context?: Record<string, unknown>) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error);
    console.error('Context:', context);
    return;
  }

  // In production, send to monitoring service
  // Example: Sentry, LogRocket, etc.
  fetch('/api/log-error', {
    method: 'POST',
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
      context,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    }),
  });
}
```

### Global Error Handler

```typescript
// src/app/layout.tsx
'use client';

import { useEffect } from 'react';

export default function ErrorHandler({ children }) {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      logError(event.error, {
        type: 'window.onerror',
        filename: event.filename,
        lineno: event.lineno,
      });
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      logError(
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason)),
        { type: 'unhandledrejection' }
      );
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return children;
}
```

## Best Practices

1. **Always provide fallbacks** - Use sample data if CMS fails
2. **Show loading states** - Users need feedback during async operations
3. **Clear error messages** - No technical jargon for users
4. **Retry options** - Let users recover from errors
5. **Log errors** - But don't expose internals to users
6. **Graceful degradation** - Core functionality works without JS

---

*See also: [Components Reference](./components-reference.md)*
