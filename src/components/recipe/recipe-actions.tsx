'use client'

import { Printer, Share2, Heart } from 'lucide-react'

interface RecipeActionsProps {
  title?: string
}

export function RecipeActions({ title }: RecipeActionsProps) {
  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Recipe',
          url: window.location.href,
        })
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleSave = () => {
    // TODO: Implement favorites functionality
    alert('Save to favorites - coming soon!')
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
        onClick={handlePrint}
      >
        <Printer className="h-4 w-4" />
        Print
      </button>
      <button
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>
      <button
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
        onClick={handleSave}
      >
        <Heart className="h-4 w-4" />
        Save
      </button>
    </div>
  )
}
