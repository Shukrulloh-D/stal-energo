import { useEffect } from 'react'
import type { RefObject } from 'react'

// закрывает выпадающий блок по клику снаружи и по Esc
export function useOutsideClose(ref: RefObject<HTMLElement | null>, active: boolean, close: () => void) {
  useEffect(() => {
    if (!active) return

    function handleClick(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) close()
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [ref, active, close])
}
