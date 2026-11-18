import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to="/" aria-label="Стальэнерго Урал — на главную">
      <img src="/images/logo.svg" alt="Стальэнерго Урал" width={150} height={40} />
    </Link>
  )
}
