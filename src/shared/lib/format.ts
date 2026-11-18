const formatter = new Intl.NumberFormat('ru-RU')

export function formatNumber(value: number): string {
  return formatter.format(value)
}

export function formatPrice(value: number): string {
  return formatNumber(value) + ' руб'
}
