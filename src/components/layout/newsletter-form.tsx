'use client'

interface NewsletterFormProps {
  placeholder?: string
  buttonLabel?: string
}

export function NewsletterForm({ placeholder, buttonLabel }: NewsletterFormProps) {
  return (
    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder={placeholder || 'Enter your email'}
        className="flex-1 h-9 rounded-md border border-stone-300 bg-white px-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-sage-600"
      />
      <button
        type="submit"
        className="h-9 rounded-md bg-sage-600 px-4 text-sm font-medium text-white hover:bg-sage-700 transition-colors"
      >
        {buttonLabel || 'Subscribe'}
      </button>
    </form>
  )
}
