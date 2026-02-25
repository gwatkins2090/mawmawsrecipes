'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'

interface IngredientItem {
  amount?: string
  unit?: string
  name: string
  notes?: string
}

interface IngredientGroup {
  groupTitle?: string
  items: IngredientItem[]
}

interface RecipeIngredientsProps {
  ingredients: IngredientGroup[]
  defaultServings?: number
}

function parseFraction(amount: string): number {
  if (!amount) return 0

  // Handle fractions like "1/2", "1 1/2"
  const mixedMatch = amount.match(/^(\d+)\s+(\d)\/(\d)$/)
  if (mixedMatch) {
    return parseInt(mixedMatch[1]) + parseInt(mixedMatch[2]) / parseInt(mixedMatch[3])
  }

  const fractionMatch = amount.match(/^(\d)\/(\d)$/)
  if (fractionMatch) {
    return parseInt(fractionMatch[1]) / parseInt(fractionMatch[2])
  }

  return parseFloat(amount) || 0
}

function formatAmount(amount: number): string {
  if (amount === 0) return ''

  // Check for common fractions
  const tolerance = 0.01
  const fractions: [number, string][] = [
    [0.25, '1/4'],
    [0.33, '1/3'],
    [0.5, '1/2'],
    [0.66, '2/3'],
    [0.75, '3/4'],
    [1.25, '1 1/4'],
    [1.5, '1 1/2'],
    [1.75, '1 3/4'],
    [2.5, '2 1/2'],
  ]

  for (const [decimal, fraction] of fractions) {
    if (Math.abs(amount - decimal) < tolerance) {
      return fraction
    }
  }

  // Check if it's a whole number
  if (Math.abs(amount - Math.round(amount)) < tolerance) {
    return Math.round(amount).toString()
  }

  return amount.toFixed(1).replace(/\.0$/, '')
}

export function RecipeIngredients({ ingredients, defaultServings = 4 }: RecipeIngredientsProps) {
  const [servings, setServings] = useState(defaultServings)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const scale = servings / defaultServings

  const toggleItem = (key: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(key)) {
      newChecked.delete(key)
    } else {
      newChecked.add(key)
    }
    setCheckedItems(newChecked)
  }

  const adjustServings = (delta: number) => {
    const newServings = servings + delta
    if (newServings >= 1 && newServings <= 50) {
      setServings(newServings)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-stone-900">Ingredients</h2>

        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-600">Servings:</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => adjustServings(-1)}
              disabled={servings <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{servings}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => adjustServings(1)}
              disabled={servings >= 50}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {ingredients.map((group, groupIndex) => (
          <div key={groupIndex}>
            {group.groupTitle && (
              <h3 className="font-semibold text-stone-800 mb-3">{group.groupTitle}</h3>
            )}
            <ul className="space-y-3">
              {group.items.map((item, itemIndex) => {
                const key = `${groupIndex}-${itemIndex}`
                const isChecked = checkedItems.has(key)
                const scaledAmount = item.amount ? parseFraction(item.amount) * scale : 0

                return (
                  <li
                    key={key}
                    className={`flex items-start gap-3 p-2 rounded-md transition-colors ${
                      isChecked ? 'bg-stone-100' : ''
                    }`}
                  >
                    <Checkbox
                      id={key}
                      checked={isChecked}
                      onCheckedChange={() => toggleItem(key)}
                      className="mt-1"
                    />
                    <label
                      htmlFor={key}
                      className={`flex-1 cursor-pointer ${
                        isChecked ? 'line-through text-stone-400' : 'text-stone-700'
                      }`}
                    >
                      <span className="font-medium">
                        {scaledAmount > 0 && formatAmount(scaledAmount)}
                        {item.unit && ` ${item.unit}`}
                      </span>
                      {' '}
                      <span className={isChecked ? '' : 'text-stone-900'}>{item.name}</span>
                      {item.notes && (
                        <span className="text-stone-500 text-sm"> ({item.notes})</span>
                      )}
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
