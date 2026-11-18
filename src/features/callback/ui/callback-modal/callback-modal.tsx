import { useState } from 'react'
import type { FormEvent } from 'react'
import { cleanPhone, isPhone } from '@/shared/lib/validate'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'
import './callback-modal.css'

interface CallbackModalProps {
  onClose: () => void
}

export function CallbackModal({ onClose }: CallbackModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()

    if (!isPhone(phone)) {
      setError('Введите правильный номер телефона')
      return
    }

    setSent(true)
  }

  return (
    <Modal label="Заказать звонок" onClose={onClose}>
      <h2 className="modal-title">Заказать звонок</h2>
      {sent ? (
        <>
          <p className="modal-text" role="status">
            Спасибо! Мы перезвоним вам в ближайшее время.
          </p>
          <Button onClick={onClose}>Закрыть</Button>
        </>
      ) : (
        <form onSubmit={submit} noValidate>
          <p className="modal-text">Оставьте номер, и менеджер свяжется с вами.</p>
          <div className="callback-fields">
            <Field label="Имя" placeholder="Как к вам обращаться" value={name} onChange={setName} />
            <Field
              label="Телефон"
              required
              type="tel"
              placeholder="+7 000 000 00 00"
              value={phone}
              error={error}
              onChange={(value) => {
                setPhone(cleanPhone(value))
                setError('')
              }}
            />
          </div>
          <Button type="submit">Заказать звонок</Button>
        </form>
      )}
    </Modal>
  )
}
