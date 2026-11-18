export interface NavLink {
  label: string
  to: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'О компании', to: '/about' },
  { label: 'Прайс-листы', to: '/price-lists' },
  { label: 'Производство', to: '/services' },
  { label: 'Закупки', to: '/delivery' },
  { label: 'Контакты', to: '/#contacts' },
]
