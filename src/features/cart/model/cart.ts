export interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  extras: string[]
}

// данные из localStorage нельзя считать надёжными: проверяем каждое поле
export function parseCart(data: unknown): CartItem[] {
  if (!Array.isArray(data)) return []

  const items: CartItem[] = []

  for (const row of data) {
    if (typeof row !== 'object' || row === null) continue

    const { id, name, price, qty, extras } = row as Record<string, unknown>

    if (typeof id !== 'string' || typeof name !== 'string') continue
    if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) continue
    if (typeof qty !== 'number' || !Number.isInteger(qty) || qty < 1 || qty > 999) continue

    const list = Array.isArray(extras) ? extras.filter((item): item is string => typeof item === 'string') : []

    items.push({ id: id.slice(0, 100), name: name.slice(0, 200), price, qty, extras: list.slice(0, 10) })
  }

  return items
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0)
}
