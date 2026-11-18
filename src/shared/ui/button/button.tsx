import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './button.css'

interface ButtonProps {
  children: ReactNode
  color?: 'green' | 'orange' | 'outline'
  to?: string
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  full?: boolean
  onClick?: () => void
}

export function Button({ children, color = 'green', to, href, type = 'button', disabled, full, onClick }: ButtonProps) {
  let className = 'button button-' + color
  if (full) className += ' button-full'

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={className} download>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
