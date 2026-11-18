import type { NewsItemData } from '../../model/news'
import './news-item.css'

export function NewsItem({ item }: { item: NewsItemData }) {
  return (
    <article className="news-item">
      <h3 className="news-item-title">{item.title}</h3>
      <p className="news-item-date">{item.date}</p>
      <p className="news-item-text">{item.text}</p>
    </article>
  )
}
