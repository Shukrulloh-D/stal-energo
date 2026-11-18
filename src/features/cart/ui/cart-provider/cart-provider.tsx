import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { readJson, writeJson } from '@/shared/lib/storage'
import { cartCount, cartTotal, parseCart } from '../../model/cart'
import type { CartItem } from '../../model/cart'
import { CartContext } from '../../model/cart-context'
import type { NewItem } from '../../model/cart-context'

const STORAGE_KEY = 'stalenergo-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => parseCart(readJson(STORAGE_KEY)))

  useEffect(() => {
    writeJson(STORAGE_KEY, items)
  }, [items])

  function add(item: NewItem, qty = 1, extras: string[] = []) {
    setItems((current) => {
      const found = current.find((row) => row.id === item.id)

      if (!found) {
        return [...current, { ...item, qty: Math.min(qty, 999), extras }]
      }

      return current.map((row) =>
        row.id === item.id
          ? { ...row, qty: Math.min(row.qty + qty, 999), extras: extras.length ? extras : row.extras }
          : row,
      )
    })
  }

  function setQty(id: string, qty: number) {
    setItems((current) => current.map((row) => (row.id === id ? { ...row, qty } : row)))
  }

  function setExtras(id: string, extras: string[]) {
    setItems((current) => current.map((row) => (row.id === id ? { ...row, extras } : row)))
  }

  function remove(id: string) {
    setItems((current) => current.filter((row) => row.id !== id))
  }

  function clear() {
    setItems([])
  }

  const value = {
    items,
    count: cartCount(items),
    total: cartTotal(items),
    add,
    setQty,
    setExtras,
    remove,
    clear,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
