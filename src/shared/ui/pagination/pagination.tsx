import './pagination.css'

interface PaginationProps {
  page: number
  total: number
  onChange: (page: number) => void
}

function getPages(page: number, total: number): Array<number | string> {
  if (total <= 5) return Array.from({ length: total }, (_, index) => index + 1)
  if (page <= 3) return [1, 2, 3, '…', total]
  if (page >= total - 2) return [1, '…', total - 2, total - 1, total]
  return [1, '…', page - 1, page, page + 1, '…', total]
}

export function Pagination({ page, total, onChange }: PaginationProps) {
  if (total <= 1) return null

  return (
    <nav className="pagination" aria-label="Страницы">
      {getPages(page, total).map((item, index) =>
        typeof item === 'number' ? (
          <button
            key={item}
            className={item === page ? 'pagination-item pagination-active' : 'pagination-item'}
            aria-current={item === page}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        ) : (
          <span key={'dots-' + index} className="pagination-dots">
            {item}
          </span>
        ),
      )}
    </nav>
  )
}
