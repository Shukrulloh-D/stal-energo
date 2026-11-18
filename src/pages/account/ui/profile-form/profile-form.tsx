import { useState } from 'react'
import type { FormEvent } from 'react'
import { cleanPhone, isEmail, isFilled, isInn, isPhone } from '@/shared/lib/validate'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import './profile-form.css'

interface ProfileValues {
  name: string
  phone: string
  inn: string
  email: string
  company: string
  address: string
  password: string
  repeat: string
}

type ProfileErrors = Partial<Record<keyof ProfileValues, string>>

const EMPTY: ProfileValues = { name: '', phone: '', inn: '', email: '', company: '', address: '', password: '', repeat: '' }

function validate(values: ProfileValues): ProfileErrors {
  const errors: ProfileErrors = {}

  if (!isFilled(values.name)) errors.name = 'Введите ФИО'
  if (!isPhone(values.phone)) errors.phone = 'Введите правильный номер'
  if (!isInn(values.inn)) errors.inn = 'ИНН: 10 или 12 цифр'
  if (!isEmail(values.email)) errors.email = 'Введите правильный email'
  if (!isFilled(values.company)) errors.company = 'Введите название компании'
  if (!isFilled(values.address)) errors.address = 'Укажите адрес доставки'

  // пароль меняем, только если его ввели
  if (values.password && values.password.length < 8) errors.password = 'Минимум 8 символов'
  if (values.password !== values.repeat) errors.repeat = 'Пароли не совпадают'

  return errors
}

export function ProfileForm() {
  const [values, setValues] = useState<ProfileValues>(EMPTY)
  const [errors, setErrors] = useState<ProfileErrors>({})
  const [saved, setSaved] = useState(false)

  function set(field: keyof ProfileValues, value: string) {
    setValues({ ...values, [field]: value })
    setErrors({ ...errors, [field]: undefined })
    setSaved(false)
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    setSaved(Object.keys(found).length === 0)
  }

  return (
    <form className="profile-form" onSubmit={submit} noValidate>
      <div className="profile-form-grid">
        <Field label="ФИО" required placeholder="ФИО" value={values.name} error={errors.name} onChange={(v) => set('name', v)} />
        <Field
          label="Телефон"
          required
          type="tel"
          placeholder="Номер вашего телефона"
          value={values.phone}
          error={errors.phone}
          onChange={(v) => set('phone', cleanPhone(v))}
        />
        <Field label="ИНН" required placeholder="ИНН" value={values.inn} error={errors.inn} onChange={(v) => set('inn', v)} />
        <Field label="Email" required type="email" placeholder="Введите вашу почту" value={values.email} error={errors.email} onChange={(v) => set('email', v)} />
        <Field label="Название компании" required placeholder="Название компании" value={values.company} error={errors.company} onChange={(v) => set('company', v)} />
        <Field label="Адрес для доставки" required placeholder="Укажите адрес доставки" value={values.address} error={errors.address} onChange={(v) => set('address', v)} />
      </div>

      <h2 className="page-title profile-form-subtitle">Смена пароля</h2>
      <div className="profile-form-password">
        <Field label="Придумайте пароль" type="password" placeholder="Пароль" value={values.password} error={errors.password} onChange={(v) => set('password', v)} />
        <Field label="Повторите пароль" type="password" placeholder="Повторите пароль" value={values.repeat} error={errors.repeat} onChange={(v) => set('repeat', v)} />
      </div>

      <div className="profile-form-actions">
        <Button type="submit">Сохранить</Button>
        <Button color="outline" to="/">
          Выйти
        </Button>
        {saved && (
          <p className="profile-form-saved" role="status">
            Данные сохранены
          </p>
        )}
      </div>
    </form>
  )
}
