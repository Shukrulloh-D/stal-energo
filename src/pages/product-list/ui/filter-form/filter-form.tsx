import { GOST_OPTIONS, STEEL_OPTIONS } from '@/entities/catalog'
import type { Filters } from '@/entities/catalog'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { Select } from '@/shared/ui/select'
import './filter-form.css'

interface FilterFormProps {
  value: Filters
  onChange: (value: Filters) => void
  onApply: () => void
  onReset: () => void
}

export function FilterForm({ value, onChange, onApply, onReset }: FilterFormProps) {
  function set(field: keyof Filters, text: string) {
    onChange({ ...value, [field]: text })
  }

  return (
    <form
      className="filter-form"
      onSubmit={(event) => {
        event.preventDefault()
        onApply()
      }}
    >
      <h2 className="filter-form-title">Фильтр</h2>
      <div className="filter-form-fields">
        <Select value={value.steel} options={STEEL_OPTIONS} placeholder="Материал" onChange={(text) => set('steel', text)} />
        <Select value={value.gost} options={GOST_OPTIONS} placeholder="ГОСТ" onChange={(text) => set('gost', text)} />
        <Field type="number" placeholder="Ширина, мм" value={value.width} onChange={(text) => set('width', text)} />
        <Field type="number" placeholder="Толщина, мм" value={value.thickness} onChange={(text) => set('thickness', text)} />
        <Field type="number" placeholder="Длина, м" value={value.length} onChange={(text) => set('length', text)} />
      </div>
      <div className="filter-form-actions">
        <Button type="submit" color="outline">
          Применить
        </Button>
        <button type="button" className="text-link" onClick={onReset}>
          Сбросить фильтр
        </button>
      </div>
    </form>
  )
}
