import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { Icon } from '@/shared/ui/icon'
import './price-lists-page.css'

const FILES = [
  { title: 'Цены на изделия из нержавеющей стали', file: '/price-lists/stainless.csv' },
  { title: 'Цены на чёрный и листовой прокат', file: '/price-lists/black.csv' },
  { title: 'Цены на трубный прокат', file: '/price-lists/pipes.csv' },
]

export function PriceListsPage() {
  return (
    <div className="container price-lists-page">
      <div className="price-lists-head">
        <h1 className="page-title">Прайс листы</h1>
        <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Прайс листы' }]} />
      </div>

      <ul>
        {FILES.map((item) => (
          <li key={item.file}>
            <a className="price-file" href={item.file} download>
              <img src="/images/icons/excel.svg" alt="" width={24} height={24} />
              <span className="price-file-title">{item.title}</span>
              <span className="price-file-download">
                <Icon name="download" size={14} />
                Скачать
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
