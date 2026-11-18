export interface Partner {
  name: string
  image: string
}

export const CLIENTS: Partner[] = [
  { name: 'Красный Октябрь', image: '/images/clients/krasny-oktyabr.png' },
  { name: 'Амурсталь', image: '/images/clients/amurstal.png' },
  { name: 'ТМК', image: '/images/clients/tmk.png' },
  { name: 'Трубодеталь', image: '/images/clients/trubodetal.png' },
  { name: 'Клиент 5', image: '/images/clients/client-5.png' },
]

export const CARRIERS: Partner[] = [
  { name: 'Деловые линии', image: '/images/carriers/delovye-linii.png' },
  { name: 'DHL', image: '/images/carriers/dhl.png' },
  { name: 'Байкал Сервис', image: '/images/carriers/baikal-service.png' },
  { name: 'ПЭК', image: '/images/carriers/pek.png' },
]
