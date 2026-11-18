import { createContext, useContext } from 'react'
import type { CartItem } from './cart'

export interface NewItem {
  id: string
  name: string
  price: number
}

export interface CartValue {
  items: CartItem[]
  count: number
  total: number
  add: (item: NewItem, qty?: number, extras?: string[]) => void
  setQty: (id: string, qty: number) => void
  setExtras: (id: string, extras: string[]) => void
  remove: (id: string) => void
  clear: () => void
}

export const CartContext = createContext<CartValue | null>(null)

export function useCart(): CartValue {
  const value = useContext(CartContext)

  if (!value) {
    throw new Error('useCart нужно вызывать внутри CartProvider')
  }

  return value
}
