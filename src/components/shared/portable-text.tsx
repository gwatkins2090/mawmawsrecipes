import { PortableText as SanityPortableText, type PortableTextReactComponents } from '@portabletext/react'
import { cn } from '@/lib/utils'

interface PortableTextProps {
  value: unknown
  className?: string
}

const components: PortableTextReactComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-stone-900 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-stone-900 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-stone-900 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold text-stone-900 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-stone-700 mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-sage-500 pl-4 italic text-stone-600 my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1 text-stone-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1 text-stone-700">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-stone-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-sage-600 hover:text-sage-700 underline"
        >
          {children}
        </a>
      )
    },
  },
}

export function PortableText({ value, className }: PortableTextProps) {
  if (!value) return null

  return (
    <div className={cn('prose prose-stone max-w-none', className)}>
      <SanityPortableText value={value as never} components={components} />
    </div>
  )
}
