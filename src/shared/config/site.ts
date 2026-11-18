export const SITE = {
  name: 'Стальэнерго Урал',
  phone: '8 800 999 79 77',
  email: 'atomes@help.com',
  city: 'Сверд. обл., г. Первоуральск',
  hours: 'Пн-Вс 8:00 - 21:00',
  vk: 'https://vk.com/',
  instagram: 'https://www.instagram.com/',
}

export function phoneHref(phone: string): string {
  return 'tel:+' + phone.replace(/\D/g, '')
}

export const STATS = [
  { value: '27000 +', label: 'товарных позиций' },
  { value: '15 лет', label: 'работы в отрасли' },
  { value: '2200 +', label: 'постоянных клиентов' },
]
