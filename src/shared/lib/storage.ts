// всё, что лежит в localStorage, пользователь может подменить, поэтому
// читаем безопасно и проверяем данные там, где используем

export function readJson(key: string): unknown {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function writeJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // хранилище недоступно (приватный режим), работаем без него
  }
}
