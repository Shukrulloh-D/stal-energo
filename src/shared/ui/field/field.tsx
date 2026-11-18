import { useId } from 'react'
import './field.css'

interface FieldProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'tel' | 'password' | 'number'
  required?: boolean
  readOnly?: boolean
  multiline?: boolean
  error?: string
  maxLength?: number
}

export function Field({ label, value, onChange, placeholder, type = 'text', required, readOnly, multiline, error, maxLength = 100 }: FieldProps) {
  const id = useId()
  const className = error ? 'field field-error' : 'field'

  return (
    <div className={className}>
      {label && (
        <label className="field-label" htmlFor={id}>
          {label}
          {required && <span className="field-required">*</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          id={id}
          className="field-input field-textarea"
          value={value}
          placeholder={placeholder}
          maxLength={1000}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={id}
          className="field-input"
          type={type}
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {error && <p className="field-message">{error}</p>}
    </div>
  )
}
