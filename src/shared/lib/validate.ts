export function isFilled(value: string): boolean {
  return value.trim().length > 0
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

export function isPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 13
}

// ИНН: 10 цифр у организаций, 12 у ИП и физлиц
export function isInn(value: string): boolean {
  return /^(\d{10}|\d{12})$/.test(value.trim())
}

// в телефон пропускаем только цифры и знаки + ( ) -
export function cleanPhone(value: string): string {
  return value.replace(/[^\d+\s()-]/g, '')
}
