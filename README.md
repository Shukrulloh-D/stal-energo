# Стальэнерго Урал — сайт оптовых поставок металлопроката

React + TypeScript + Vite, структура FSD. Учебный проект по макету из Figma.

## Запуск

```bash
npm ci             # ставит ровно те версии, что записаны в package-lock.json
npm run dev        # http://localhost:5173
npm run build      # проверка типов + сборка в dist/
npm run lint       # oxlint
npm audit --omit=dev   # уязвимости в том, что попадает к пользователю
```

## Страницы

| Адрес | Страница |
|---|---|
| `/` | главная |
| `/catalog/:category` | раздел каталога: подразделы и SEO-текст |
| `/catalog/:category/:sub` | список товаров: фильтр, сортировка, пагинация, таблица/карточки |
| `/search?q=...` | поиск (тот же список товаров) |
| `/product/:id` | карточка товара |
| `/order` | корзина и оформление заказа |
| `/services`, `/services/:slug` | услуги |
| `/delivery` | доставка и оплата |
| `/about` | о компании |
| `/account` | личный кабинет |
| `/price-lists` | прайс-листы |

Пункты меню без своего макета временно ведут на существующие страницы: «Производство» → `/services`, «Закупки» → `/delivery`, «Контакты» → подвал главной. Меняется в `src/shared/config/nav.ts`.

## Структура (FSD)

Импортировать можно только слои **ниже** текущего, и только через `index.ts` слайса. Слайсы одного слоя друг друга не импортируют.

```
src/
├─ app/        запуск: провайдеры, роутер, layout, глобальные стили
├─ pages/      страницы (секции, нужные одной странице, лежат в её ui/)
├─ widgets/    блоки для нескольких страниц: header, footer, why-us, logo-carousel, news-slider
├─ features/   действия: callback (заказ звонка), cart (корзина)
├─ entities/   данные и карточки: catalog (категории и товары), service, news, partner
└─ shared/     ui (кнопка, поля, карусель...), lib (проверки, форматы), config
```

Внутри слайса: `ui/` — компоненты (tsx + css рядом), `model/` — типы, данные, логика.

## Как это работает

- **Корзина**: `features/cart`. Состояние в Context, сохраняется в localStorage. При чтении каждое поле проверяется (`model/cart.ts`, `parseCart`), потому что содержимое localStorage пользователь может подменить.
- **Заказ звонка**: `features/callback`. `useCallbackModal().open()` открывает окно из любого места.
- **Каталог**: данные в `entities/catalog/model`. Категории — реальные, товары сейчас генерируются (по 25 на раздел), позже заменяются запросом к API. Фильтр, сортировка и пагинация считаются в `pages/product-list`.
- **Шапка при прокрутке**: хук `useScrolled` добавляет класс `header-compact`, CSS прячет верхнюю строку.
- **Меню каталога**: `widgets/header/ui/catalog-menu`, подраздел показывается при наведении на раздел.
- **Карусели**: `shared/ui/carousel`, горизонтальная прокрутка со scroll-snap, стрелки листают на ширину блока.
- **Формы** (звонок, заказ, профиль): свои `useState`, проверки в `shared/lib/validate.ts`. Данные никуда не отправляются (бэкенда нет). Вход и выход в личном кабинете тоже без авторизации.

## Картинки

Лежат в `public/images`, пути начинаются с `/images/...`. Svg-файлы (логотип, иконки услуг и преимуществ) в проекте уже есть как заготовки, замените их экспортом из Figma. Png-фото нужно добавить, пока их нет, блоки серые.

| Файл | Где указан |
|---|---|
| `logo.svg` | `shared/ui/logo/logo.tsx` |
| `icons/services/*.svg`, `icons/why/*.svg`, `icons/excel.svg` | `entities/service/model`, `widgets/why-us`, `pages/price-lists` |
| `hero.png` | `pages/home/ui/hero/hero.css` |
| `categories/<slug>.png` (4 первых раздела) | `pages/home/ui/catalog-cards` |
| `popular/*.png`, `offers/*.png` | `pages/home/ui/popular`, `pages/home/ui/offers` |
| `services-home.png` | `pages/home/ui/services-block` |
| `subcategories/<slug>.png` | `pages/category/ui/category-page` (slug из `entities/catalog/model/categories.ts`) |
| `seo.png` | `pages/category/ui/category-page` |
| `products/<category-slug>.png` | `entities/catalog` (`productImage`) |
| `services/<slug>.png` | `entities/service/model/services.ts` |
| `clients/*.png`, `carriers/*.png` | `entities/partner/model/partners.ts` |
| `delivery.png`, `about.png`, `reviews/letter-1..3.png` | `pages/delivery`, `pages/about` |

Файлы прайс-листов (`public/price-lists/*.csv`) — заготовки, замените своими и поправьте названия в `pages/price-lists`.

## Безопасность

1. **Пакеты**: три рабочие зависимости (`react`, `react-dom`, `react-router-dom`), версии в `package.json` без `^`, в `package-lock.json` зафиксированы точные. На сервере и в CI ставить `npm ci`.
2. **Аудит меняется со временем.** Вчерашний «0 уязвимостей» не гарантирует сегодняшний. Проверять перед каждой сдачей и деплоем:
   - `npm audit --omit=dev`: пакеты, которые уходят пользователю. Здесь должно быть 0.
   - `npm audit`: все пакеты, включая инструменты сборки. Предупреждение про `picomatch` (внутри Vite) касается только сборки на вашей машине, а не сайта, и исправленной версии на момент проверки не было. Не запускайте `npm audit fix --force`: он откатывает Vite на старую версию. Вернитесь к проверке позже и обновите `vite`, когда выйдет исправление.
3. **XSS**: нет `dangerouslySetInnerHTML`, `eval`, `innerHTML`. React экранирует всё, что выводится в JSX. Поисковый запрос из адреса показывается только как текст и ищется как подстрока.
4. **Данные из localStorage** (корзина) проверяются по типам и диапазонам перед использованием.
5. **Файл в заказе**: проверяются расширение и размер (до 5 МБ). Это только удобство для пользователя, настоящую проверку делает сервер.
6. **Ссылки**: внешние с `target="_blank"` имеют `rel="noopener noreferrer"`.
7. **Заголовки**: `public/_headers` (Netlify и совместимые) задаёт CSP, `nosniff`, `Referrer-Policy`, `Permissions-Policy`. Для Vercel те же значения кладутся в `vercel.json`. В режиме разработки не действует.
8. **Когда появится бэкенд**: проверять всё на сервере, ограничивать частоту запросов, использовать HTTPS и токены от подделки запросов, не хранить секреты во фронтенде.
