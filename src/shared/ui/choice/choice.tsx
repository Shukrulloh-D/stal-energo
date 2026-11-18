import type { ReactNode } from 'react'
import './choice.css'

interface ChoiceProps {
  type: 'radio' | 'checkbox'
  label: ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
  name?: string
}

export function Choice({ type, label, checked, onChange, name }: ChoiceProps) {
  return (
    <label className="choice">
      <input
        className="choice-input"
        type={type}
        name={name}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className={'choice-mark choice-' + type} />
      <span className="choice-label">{label}</span>
    </label>
  )
}
