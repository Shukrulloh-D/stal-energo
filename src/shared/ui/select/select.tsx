import { useId } from 'react'
import './select.css'

interface SelectProps {
  label?: string
  value: string
  options: string[]
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: string
}

export function Select({ label, value, options, onChange, placeholder, required, error }: SelectProps) {
  const id = useId()

  return (
    <div className={error ? 'select select-error' : 'select'}>
      {label && (
        <label className="select-label" htmlFor={id}>
          {label}
          {required && <span className="select-required">*</span>}
        </label>
      )}
      <select id={id} className="select-input" value={value} onChange={(event) => onChange(event.target.value)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="select-message">{error}</p>}
    </div>
  )
}
