import { Button } from '@/shared/ui/button'
import './empty-state.css'

interface EmptyStateProps {
  title: string
  text?: string
  to?: string
  button?: string
}

export function EmptyState({ title, text, to = '/', button = 'На главную' }: EmptyStateProps) {
  return (
    <div className="container empty-state">
      <h1 className="page-title">{title}</h1>
      {text && <p className="empty-state-text">{text}</p>}
      <Button to={to}>{button}</Button>
    </div>
  )
}
