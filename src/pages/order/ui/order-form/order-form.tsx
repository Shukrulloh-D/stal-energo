import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { cleanPhone, isEmail, isFilled, isInn, isPhone } from '@/shared/lib/validate'
import { Button } from '@/shared/ui/button'
import { Choice } from '@/shared/ui/choice'
import { Field } from '@/shared/ui/field'
import { Icon } from '@/shared/ui/icon'
import { Select } from '@/shared/ui/select'
import './order-form.css'

interface OrderValues {
  type: 'person' | 'company'
  name: string
  inn: string
  company: string
  phone: string
  email: string
  delivery: 'delivery' | 'pickup'
  address: string
  payment: string
  message: string
  consent: boolean
}

type OrderErrors = Partial<Record<keyof OrderValues | 'file', string>>

const PAYMENTS = ['Наличными', 'Банковской картой', 'Безналичный расчёт по счёту']
const FILE_TYPES = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png']
const MAX_FILE_SIZE = 5 * 1024 * 1024

const EMPTY: OrderValues = {
  type: 'company',
  name: '',
  inn: '',
  company: '',
  phone: '',
  email: '',
  delivery: 'delivery',
  address: '',
  payment: '',
  message: '',
  consent: false,
}

function checkFile(file: File | null): string | undefined {
  if (!file) return undefined

  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''

  if (!FILE_TYPES.includes(extension)) return 'Допустимые форматы: ' + FILE_TYPES.join(', ')
  if (file.size > MAX_FILE_SIZE) return 'Файл больше 5 МБ'
  return undefined
}

function validate(values: OrderValues): OrderErrors {
  const errors: OrderErrors = {}

  if (!isFilled(values.name)) errors.name = 'Введите ФИО'
  if (!isPhone(values.phone)) errors.phone = 'Введите правильный номер'
  if (!isEmail(values.email)) errors.email = 'Введите правильный email'

  if (values.type === 'company') {
    if (!isInn(values.inn)) errors.inn = 'ИНН: 10 или 12 цифр'
    if (!isFilled(values.company)) errors.company = 'Введите название компании'
  }

  if (values.delivery === 'delivery' && !isFilled(values.address)) errors.address = 'Укажите адрес доставки'
  if (!values.payment) errors.payment = 'Выберите способ оплаты'
  if (!values.consent) errors.consent = 'Нужно согласие на обработку данных'

  return errors
}

interface OrderFormProps {
  onSubmit: () => void
}

export function OrderForm({ onSubmit }: OrderFormProps) {
  const [values, setValues] = useState<OrderValues>(EMPTY)
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<OrderErrors>({})

  function set<K extends keyof OrderValues>(field: K, value: OrderValues[K]) {
    setValues({ ...values, [field]: value })
    setErrors({ ...errors, [field]: undefined })
  }

  function changeFile(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null
    setFile(next)
    setErrors({ ...errors, file: checkFile(next) })
  }

  function submit(event: FormEvent) {
    event.preventDefault()

    const found = validate(values)
    const fileError = checkFile(file)
    if (fileError) found.file = fileError

    setErrors(found)

    if (Object.keys(found).length === 0) {
      onSubmit()
    }
  }

  const isCompany = values.type === 'company'

  return (
    <form className="order-form" onSubmit={submit} noValidate>
      <h2 className="section-title">Доставка и оплата</h2>

      <div className="order-form-row">
        <Choice type="radio" name="type" label="Частное лицо" checked={!isCompany} onChange={() => set('type', 'person')} />
        <Choice type="radio" name="type" label="Юридическое лицо" checked={isCompany} onChange={() => set('type', 'company')} />
      </div>

      <div className="order-form-grid">
        <Field label="ФИО" required placeholder="ФИО" value={values.name} error={errors.name} onChange={(v) => set('name', v)} />
        {isCompany && (
          <Field label="ИНН" required placeholder="ИНН" value={values.inn} error={errors.inn} onChange={(v) => set('inn', v)} />
        )}
        {isCompany && (
          <Field
            label="Название компании"
            required
            placeholder="Название компании"
            value={values.company}
            error={errors.company}
            onChange={(v) => set('company', v)}
          />
        )}
        <Field
          label="Телефон"
          required
          type="tel"
          placeholder="Номер вашего телефона"
          value={values.phone}
          error={errors.phone}
          onChange={(v) => set('phone', cleanPhone(v))}
        />
        <Field
          label="Email"
          required
          type="email"
          placeholder="Введите выше почту"
          value={values.email}
          error={errors.email}
          onChange={(v) => set('email', v)}
        />
        {isCompany && (
          <div className="order-form-file">
            <label className="text-link">
              <Icon name="clip" size={14} /> {file ? file.name : 'Прикрепить файл'}
              <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png" onChange={changeFile} />
            </label>
            {errors.file && <p className="order-form-error">{errors.file}</p>}
          </div>
        )}
      </div>

      <div className="order-form-row">
        <Choice type="radio" name="delivery" label="Доставка" checked={values.delivery === 'delivery'} onChange={() => set('delivery', 'delivery')} />
        <Choice type="radio" name="delivery" label="Самовывоз" checked={values.delivery === 'pickup'} onChange={() => set('delivery', 'pickup')} />
      </div>

      <div className="order-form-grid order-form-grid-two">
        <div className="order-form-column">
          {values.delivery === 'delivery' && (
            <Field
              label="Адрес доставки"
              required
              placeholder="Укажите адрес доставки"
              value={values.address}
              error={errors.address}
              onChange={(v) => set('address', v)}
            />
          )}
          <Select
            label="Способ оплаты"
            required
            value={values.payment}
            options={PAYMENTS}
            placeholder="Выберите способ оплаты"
            error={errors.payment}
            onChange={(v) => set('payment', v)}
          />
        </div>
        <Field label="Сообщение" multiline placeholder="Введите текст сообщения" value={values.message} onChange={(v) => set('message', v)} />
      </div>

      <div className="order-form-submit">
        <Button type="submit">Оформить заказ</Button>
        <div>
          <Choice
            type="checkbox"
            checked={values.consent}
            onChange={(checked) => set('consent', checked)}
            label={
              <>
                Даю согласие на обработку персональных данных (<span className="text-link">Политика конфиденциальности</span>)
              </>
            }
          />
          {errors.consent && <p className="order-form-error">{errors.consent}</p>}
        </div>
      </div>
    </form>
  )
}
