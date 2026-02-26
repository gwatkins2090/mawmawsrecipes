# Forms and Validation Guide

Complete guide to form handling patterns in the project.

## Form Philosophy

- **Progressive Enhancement** - Forms work without JavaScript
- **Native Validation** - Use HTML5 validation where possible
- **Clear Feedback** - Users always know the form state
- **Accessible** - Proper labels, ARIA attributes, error messages

## Contact Form

### Implementation Pattern
**File:** `src/app/contact/contact-client.tsx`

```typescript
'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  artworkInterest?: string;
}

export function ContactClient({ artistData }) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    artworkInterest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success
      setIsSubmitted(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          artworkInterest: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields... */}
    </form>
  );
}
```

### Form Field Pattern

```tsx
<div className="space-y-2">
  <Label htmlFor="name">Name *</Label>
  <Input
    id="name"
    name="name"
    type="text"
    required
    value={formData.name}
    onChange={handleInputChange}
    placeholder="Your name"
    className="focus-ring"
  />
</div>
```

### Select Dropdown Pattern

```tsx
<div className="space-y-2">
  <Label htmlFor="subject">Subject *</Label>
  <select
    id="subject"
    name="subject"
    required
    value={formData.subject}
    onChange={handleInputChange}
    className="w-full h-10 px-3 rounded-md border border-input bg-background"
  >
    <option value="">Select a subject...</option>
    <option value="commission">Commission Inquiry</option>
    <option value="purchase">Purchase Question</option>
    <option value="workshop">Workshop Interest</option>
    <option value="general">General Inquiry</option>
  </select>
</div>
```

### Textarea Pattern

```tsx
<div className="space-y-2">
  <Label htmlFor="message">Message *</Label>
  <textarea
    id="message"
    name="message"
    required
    rows={5}
    value={formData.message}
    onChange={handleInputChange}
    placeholder="Tell me about your project or question..."
    className="w-full px-3 py-2 rounded-md border border-input bg-background resize-y min-h-[120px]"
  />
</div>
```

### Submit Button Pattern

```tsx
<Button
  type="submit"
  variant="gallery"
  size="lg"
  className="w-full"
  disabled={isSubmitting || isSubmitted}
>
  {isSubmitting ? (
    <>
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
      Sending...
    </>
  ) : isSubmitted ? (
    <>
      <CheckCircle className="h-4 w-4 mr-2" />
      Message Sent!
    </>
  ) : (
    'Send Message'
  )}
</Button>
```

### Success State Animation

```tsx
<AnimatePresence>
  {isSubmitted && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-4 bg-green-50 text-green-700 rounded-lg text-center"
    >
      <CheckCircle className="h-8 w-8 mx-auto mb-2" />
      <p className="font-medium">Message sent successfully!</p>
      <p className="text-sm">Thank you for reaching out. I'll be in touch soon.</p>
    </motion.div>
  )}
</AnimatePresence>
```

## Validation Patterns

### Native HTML5 Validation

```tsx
// Required field
<input required />

// Email validation
<input type="email" required />

// Pattern validation
<input pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="Phone: XXX-XXX-XXXX" />

// Min/Max length
<input minLength={2} maxLength={100} />

// Number ranges
<input type="number" min={0} max={10000} />
```

### Custom Validation Function

```typescript
function validateForm(data: ContactFormData): string | null {
  if (!data.name.trim()) {
    return 'Name is required';
  }

  if (!data.email.trim()) {
    return 'Email is required';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Please enter a valid email';
  }

  if (!data.subject) {
    return 'Please select a subject';
  }

  if (!data.message.trim() || data.message.length < 10) {
    return 'Message must be at least 10 characters';
  }

  return null; // Valid
}
```

### Real-time Validation

```typescript
const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

const validateField = (name: keyof ContactFormData, value: string) => {
  switch (name) {
    case 'email':
      return value && !isValidEmail(value) ? 'Invalid email' : '';
    case 'message':
      return value.length < 10 ? 'Message too short' : '';
    default:
      return '';
  }
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));

  // Real-time validation
  const error = validateField(name, value);
  setErrors(prev => ({ ...prev, [name]: error }));
};
```

### Error Display Pattern

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email *</Label>
  <Input
    id="email"
    name="email"
    type="email"
    required
    value={formData.email}
    onChange={handleInputChange}
    className={errors.email ? 'border-red-500' : ''}
  />
  {errors.email && (
    <p className="text-sm text-red-500">{errors.email}</p>
  )}
</div>
```

## Form Submission Patterns

### Client-Side Only

```typescript
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  // Validate
  const error = validateForm(formData);
  if (error) {
    setFormError(error);
    return;
  }

  setIsSubmitting(true);

  try {
    // Option 1: Send to API route
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Failed to send');

    // Option 2: Third-party service (Formspree, etc.)
    // const response = await fetch('https://formspree.io/f/YOUR_ID', {...})

    setIsSubmitted(true);
  } catch (error) {
    setFormError('Failed to send message. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

### API Route Handler

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email (using nodemailer, SendGrid, etc.)
    // await sendEmail(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
```

## Accessibility

### Required Field Indicators

```tsx
<Label htmlFor="email">
  Email <span className="text-red-500" aria-label="required">*</span>
</Label>
```

### ARIA Attributes

```tsx
<form aria-label="Contact form">
  <div role="alert" aria-live="polite">
    {formError && (
      <p className="text-red-500">{formError}</p>
    )}
  </div>

  <input
    aria-invalid={errors.email ? 'true' : 'false'}
    aria-describedby={errors.email ? 'email-error' : undefined}
  />
  {errors.email && (
    <p id="email-error" className="text-red-500">{errors.email}</p>
  )}
</form>
```

### Focus Management

```typescript
const formRef = useRef<HTMLFormElement>(null);
const firstErrorRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  // Focus first error field
  if (Object.keys(errors).length > 0 && firstErrorRef.current) {
    firstErrorRef.current.focus();
  }
}, [errors]);
```

## Best Practices

1. **Always label inputs** - Use `<Label>` component
2. **Show loading state** - Disable submit during submission
3. **Confirm success** - Clear visual feedback
4. **Handle errors gracefully** - User-friendly error messages
5. **Prevent double-submit** - Disable button while submitting
6. **Auto-focus errors** - First error field gets focus
7. **Reset after success** - Clear form after successful submission

---

*See also: [Components Reference](./components-reference.md)*
