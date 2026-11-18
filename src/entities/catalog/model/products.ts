import { CATEGORIES } from './categories'

export type PriceType = 'price' | 'price-list' | 'manager'

export interface Product {
  id: string
  name: string
  categorySlug: string
  subSlug: string
  steel: string
  gost: string
  dy: number
  d1: number
  d: number
  thickness: number
  width: number
  length: number
  priceType: PriceType
  price: number
}

export interface Filters {
  steel: string
  gost: string
  width: string
  thickness: string
  length: string
}

export const EMPTY_FILTERS: Filters = { steel: '', gost: '', width: '', thickness: '', length: '' }

export const STEEL_OPTIONS = ['Ст3', '09Г2С', '20', '12Х18Н10Т', '40Х']
export const GOST_OPTIONS = ['ГОСТ 25660-23', 'ГОСТ 19281', 'ГОСТ 8731', 'ГОСТ 380']

const WIDTHS = [1000, 1250, 1500]
const THICKNESS = [1.5, 2, 3, 4, 6, 8, 10]
const LENGTHS = [3, 6, 9, 12]
const PER_SUB = 25

// временные данные: по 25 товаров в каждом разделе
function buildProducts(): Product[] {
  const list: Product[] = []
  let subIndex = 0

  for (const category of CATEGORIES) {
    for (const sub of category.subs) {
      for (let n = 0; n < PER_SUB; n++) {
        const steel = STEEL_OPTIONS[(n + subIndex) % STEEL_OPTIONS.length]
        const gost = GOST_OPTIONS[(n + subIndex) % GOST_OPTIONS.length]
        const thickness = THICKNESS[n % THICKNESS.length]
        const width = WIDTHS[n % WIDTHS.length]
        const length = LENGTHS[n % LENGTHS.length]
        const kind = n % 5

        list.push({
          id: sub.slug + '-' + (n + 1),
          name: `${sub.title} ${thickness} ${width / 1000}м ${length}м ${steel} ${gost.replace('ГОСТ ', '')}`,
          categorySlug: category.slug,
          subSlug: sub.slug,
          steel,
          gost,
          dy: 200 + ((n * 7) % 100),
          d1: 300 + ((n * 11) % 100),
          d: 400 + ((n * 13) % 100),
          thickness,
          width,
          length,
          priceType: kind === 3 ? 'price-list' : kind === 4 ? 'manager' : 'price',
          price: 40000 + ((subIndex * 13 + n * 37) % 40) * 1000 + 925,
        })
      }
      subIndex++
    }
  }

  return list
}

export const PRODUCTS: Product[] = buildProducts()

export function findProduct(id: string | undefined): Product | undefined {
  return PRODUCTS.find((product) => product.id === id)
}

export function productsOf(subSlug: string): Product[] {
  return PRODUCTS.filter((product) => product.subSlug === subSlug)
}

export function searchProducts(query: string): Product[] {
  const text = query.trim().toLowerCase().slice(0, 100)
  if (!text) return []
  return PRODUCTS.filter((product) => product.name.toLowerCase().includes(text))
}

export function filterProducts(list: Product[], filters: Filters): Product[] {
  return list.filter((product) => {
    if (filters.steel && product.steel !== filters.steel) return false
    if (filters.gost && product.gost !== filters.gost) return false
    if (filters.width && !String(product.width).startsWith(filters.width.trim())) return false
    if (filters.thickness && !String(product.thickness).startsWith(filters.thickness.trim())) return false
    if (filters.length && !String(product.length).startsWith(filters.length.trim())) return false
    return true
  })
}

export function productImage(product: Product): string {
  return '/images/products/' + product.categorySlug + '.png'
}

export const EXTRA_OPTIONS = ['Резка', 'Упаковка', 'Маркировка', 'Погрузка']
