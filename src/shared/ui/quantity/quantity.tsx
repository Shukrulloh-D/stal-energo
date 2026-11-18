import { Icon } from '@/shared/ui/icon'
import './quantity.css'

interface QuantityProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function Quantity({ value, onChange, min = 1, max = 999 }: QuantityProps) {
  function set(next: number) {
    if (Number.isNaN(next)) return
    onChange(Math.min(max, Math.max(min, Math.round(next))))
  }

  return (
    <div className="quantity">
      <button type="button" aria-label="Меньше" onClick={() => set(value - 1)}>
        <Icon name="minus" size={12} />
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        aria-label="Количество"
        onChange={(event) => set(Number(event.target.value))}
      />
      <button type="button" aria-label="Больше" onClick={() => set(value + 1)}>
        <Icon name="plus" size={12} />
      </button>
    </div>
  )
}
