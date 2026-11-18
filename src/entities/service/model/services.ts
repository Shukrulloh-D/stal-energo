export interface ServiceSection {
  title: string
  text?: string
  items?: string[]
}

export interface Service {
  slug: string
  title: string
  icon: string
  image: string
  sections: ServiceSection[]
}

const PRICE_FACTORS = ['объёма работ', 'толщины и размеров металла', 'сроков выполнения']

function service(slug: string, title: string, icon: string, intro: string, extra: ServiceSection[]): Service {
  return {
    slug,
    title,
    icon: '/images/icons/services/' + icon + '.svg',
    image: '/images/services/' + slug + '.png',
    sections: [
      { title: 'Преимущества', text: intro },
      ...extra,
      { title: 'Стоимость услуги зависит от:', items: PRICE_FACTORS },
    ],
  }
}

export const SERVICES: Service[] = [
  service(
    'rezka-metalloprokata',
    'Резка металлопроката',
    'cut',
    'Сверление отверстий в металлопрокате (лист, уголок, балка) и металлоконструкциях осуществляется по чертежам клиента при наличии прямой плоскости минимальными размерами 270х100 мм для крепления сверлильного станка. Сверлению подвергается металл толщиной от 4 до 50 мм, при этом диаметр отверстия может иметь размер от 10 до 50 мм.',
    [{ title: 'Недостатки сверления:', items: ['возможность неровности реза', 'невозможность осуществления сложных форм реза'] }],
  ),
  service('litye-detaley', 'Литьё деталей и заготовок', 'cast', 'Отливаем детали и заготовки по чертежам заказчика из черных и цветных металлов. Контролируем качество на каждом этапе.', []),
  service('termoobrabotka', 'Термообработка (закаливание металлоизделий)', 'heat', 'Закалка, отпуск и отжиг повышают прочность и износостойкость металлоизделий. Работаем с деталями разных размеров.', []),
  service('cinkovanie', 'Цинкование металлоизделий', 'zinc', 'Горячее цинкование защищает металл от коррозии на десятки лет и подходит для конструкций, эксплуатируемых на улице.', []),
  service('shlifovka-trub', 'Шлифовка труб и металлопроката', 'grind', 'Шлифуем поверхность труб и листов до нужной чистоты, убираем окалину и следы проката.', []),
  service('antikorrozionnye-pokrytiya', 'Нанесение антикоррозионных покрытий', 'coat', 'Наносим грунты, краски и защитные составы, которые продлевают срок службы металла.', []),
  service('izolyaciya-trub', 'Изоляция труб', 'insulation', 'Изолируем трубы для подземной и наземной прокладки. Подбираем материал под условия эксплуатации.', []),
  service('tokarnye-raboty', 'Токарные, фрезерные и слесарные работы по металлу', 'turn', 'Выполняем токарные, фрезерные и слесарные работы по чертежам и образцам, изготавливаем детали единично и партиями.', []),
]

export function findService(slug: string | undefined): Service {
  return SERVICES.find((item) => item.slug === slug) ?? SERVICES[0]
}
