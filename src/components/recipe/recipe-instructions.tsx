'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Clock, Thermometer } from 'lucide-react'

interface Instruction {
  _key: string
  step?: number
  title?: string
  instruction?: string
  instructions?: string
  time?: string
  temperature?: string
  tip?: string
  timerDuration?: number
}

interface RecipeInstructionsProps {
  instructions: Instruction[]
}

export function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
  const [checkedSteps, setCheckedSteps] = useState<Set<string>>(new Set())

  const toggleStep = (key: string) => {
    const newChecked = new Set(checkedSteps)
    if (newChecked.has(key)) {
      newChecked.delete(key)
    } else {
      newChecked.add(key)
    }
    setCheckedSteps(newChecked)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900 mb-6">Instructions</h2>

      <ol className="space-y-6">
        {instructions.map((step, index) => {
          const isChecked = checkedSteps.has(step._key)
          const stepNumber = step.step || index + 1
          // Handle both old and new data structures
          const stepTitle = step.title || `Step ${stepNumber}`
          const stepContent = step.instructions || step.instruction || ''
          const stepTime = step.time || (step.timerDuration ? `${step.timerDuration} mins` : undefined)
          const stepTemp = step.temperature
          const stepTip = step.tip

          return (
            <li
              key={step._key}
              className={`flex gap-4 p-4 rounded-lg transition-colors ${
                isChecked ? 'bg-stone-100' : 'bg-stone-50'
              }`}
            >
              <div className="flex-shrink-0">
                <Checkbox
                  id={`step-${step._key}`}
                  checked={isChecked}
                  onCheckedChange={() => toggleStep(step._key)}
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor={`step-${step._key}`}
                  className={`block cursor-pointer ${
                    isChecked ? 'line-through text-stone-400' : 'text-stone-700'
                  }`}
                >
                  <span className="font-semibold text-stone-900 mr-2">
                    {stepTitle}
                  </span>
                  <span className={isChecked ? '' : 'text-stone-900'}>
                    {stepContent}
                  </span>
                </label>

                {(stepTime || stepTemp || stepTip) && (
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-stone-500">
                    {stepTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{stepTime}</span>
                      </div>
                    )}
                    {stepTemp && (
                      <div className="flex items-center gap-1">
                        <Thermometer className="h-4 w-4" />
                        <span>{stepTemp}</span>
                      </div>
                    )}
                    {stepTip && (
                      <div className="flex items-center gap-1 text-amber-600">
                        <span className="text-xs font-medium">Tip: {stepTip}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
