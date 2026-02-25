import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) {
    return `${hours} hr`
  }
  return `${hours} hr ${mins} min`
}

export function parseTime(timeStr: string): number {
  if (!timeStr) return 0
  const hours = timeStr.match(/(\d+)\s*(?:hr|hour)/i)
  const mins = timeStr.match(/(\d+)\s*(?:min|minute)/i)
  let total = 0
  if (hours) total += parseInt(hours[1]) * 60
  if (mins) total += parseInt(mins[1])
  return total || 0
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}
