import { createContext, useContext } from 'react'

interface CallbackValue {
  open: () => void
}

export const CallbackContext = createContext<CallbackValue | null>(null)

export function useCallbackModal(): CallbackValue {
  const value = useContext(CallbackContext)

  if (!value) {
    throw new Error('useCallbackModal нужно вызывать внутри CallbackProvider')
  }

  return value
}
