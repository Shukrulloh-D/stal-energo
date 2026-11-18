import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import { CallbackContext } from '../../model/callback-context'
import { CallbackModal } from '../callback-modal/callback-modal'

export function CallbackProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <CallbackContext.Provider value={{ open }}>
      {children}
      {isOpen && <CallbackModal onClose={close} />}
    </CallbackContext.Provider>
  )
}
