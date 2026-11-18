import { useRef, useState } from 'react'
import { useOutsideClose } from '@/shared/lib/use-outside-click'
import { Choice } from '@/shared/ui/choice'
import { Icon } from '@/shared/ui/icon'
import './multi-select.css'

interface MultiSelectProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export function MultiSelect({ options, selected, onChange }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useOutsideClose(rootRef, open, () => setOpen(false))

  function toggle(option: string, checked: boolean) {
    onChange(checked ? [...selected, option] : selected.filter((item) => item !== option))
  }

  return (
    <div className="multi-select" ref={rootRef}>
      <button type="button" className="multi-select-button" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>{selected.length ? selected.join(', ') : 'Выбрать'}</span>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={14} />
      </button>
      {open && (
        <div className="multi-select-list">
          {options.map((option) => (
            <Choice
              key={option}
              type="checkbox"
              label={option}
              checked={selected.includes(option)}
              onChange={(checked) => toggle(option, checked)}
            />
          ))}
          <button type="button" className="multi-select-reset" onClick={() => onChange([])}>
            Отменить все
          </button>
        </div>
      )}
    </div>
  )
}
