export interface SubCategory {
  slug: string;
  title: string;
}

export interface Category {
  slug: string;
  title: string;
  subs: SubCategory[];
}

function subs(pairs: string[][]): SubCategory[] {
  return pairs.map(([slug, title]) => ({ slug, title }));
}

export const CATEGORIES: Category[] = [
  {
    slug: "categories-1",
    title: "Трубный прокат",
    subs: subs([
      ["besshovnye-truby", "Бесшовные трубы"],
      ["elektrosvarnye-truby", "Электросварные трубы"],
      ["profilnye-truby", "Профильные трубы"],
      ["ocinkovannye-truby", "Оцинкованные трубы"],
    ]),
  },
  {
    slug: "categories-2",
    title: "Детали трубопроводов",
    subs: subs([
      ["otvody", "Отводы"],
      ["troyniki", "Тройники"],
      ["perehody", "Переходы"],
      ["flancy", "Фланцы"],
      ["zaglushki", "Заглушки"],
    ]),
  },
  {
    slug: "categories-3",
    title: "Трубопроводная арматура",
    subs: subs([
      ["zadvizhki", "Задвижки"],
      ["klapany", "Клапаны"],
      ["krany-sharovye", "Краны шаровые"],
      ["zatvory", "Затворы"],
    ]),
  },
  {
    slug: "categories-4",
    title: "Цветной металлопрокат",
    subs: subs([
      ["alyuminiy", "Алюминий"],
      ["med", "Медь"],
      ["latun", "Латунь"],
      ["bronza", "Бронза"],
    ]),
  },
  {
    slug: "categories-5",
    title: "Нержавеющий прокат",
    subs: subs([
      ["list-nerzhaveyushchiy", "Лист нержавеющий"],
      ["truba-nerzhaveyushchaya", "Труба нержавеющая"],
      ["krug-nerzhaveyushchiy", "Круг нержавеющий"],
      ["ugolok-nerzhaveyushchiy", "Уголок нержавеющий"],
    ]),
  },
  {
    slug: "chernyy-prokat",
    title: "Чёрный прокат",
    subs: subs([
      ["shveller", "Швеллер"],
      ["balka-dvutavrovaya", "Балка двутавровая"],
      ["armatura", "Арматура"],
      ["ugolok", "Уголок металлический"],
    ]),
  },
  {
    slug: "listovoy-prokat",
    title: "Листовой прокат",
    subs: subs([
      ["list-gk", "Лист Г/К"],
      ["list-hk", "Лист Х/К"],
      ["list-nlg", "Лист НЛГ"],
      ["list-oc", "Лист ОЦ"],
      ["list-rifl", "Лист РИФЛ"],
      ["list-nerzhaveyki", "Лист нержавейки"],
      ["list-pvl", "Лист ПВЛ"],
      ["list-polimer", "Лист полимер"],
    ]),
  },
  {
    slug: "zharoprochnyy-prokat",
    title: "Жаропрочный прокат",
    subs: subs([
      ["zharoprochnyy-list", "Жаропрочный лист"],
      ["zharoprochnaya-truba", "Жаропрочная труба"],
      ["zharoprochnyy-krug", "Жаропрочный круг"],
    ]),
  },
  {
    slug: "metallokonstrukcii",
    title: "Металлоконструкции",
    subs: subs([
      ["fermy", "Фермы"],
      ["kolonny", "Колонны"],
      ["balki", "Балки"],
      ["karkasy", "Каркасы"],
    ]),
  },
  {
    slug: "ferrosplavy",
    title: "Ферросплавы",
    subs: subs([
      ["ferromarganec", "Ферромарганец"],
      ["ferrohrom", "Феррохром"],
      ["ferrosilicij", "Ферросилиций"],
    ]),
  },
  {
    slug: "metallicheskie-poroshki",
    title: "Металлические порошки",
    subs: subs([
      ["zheleznyy-poroshok", "Железный порошок"],
      ["mednyy-poroshok", "Медный порошок"],
      ["alyuminievyy-poroshok", "Алюминиевый порошок"],
    ]),
  },
  {
    slug: "kabelnoe-oborudovanie",
    title: "Кабельное оборудование",
    subs: subs([
      ["kabelnye-lotki", "Кабельные лотки"],
      ["kabel-kanaly", "Кабель-каналы"],
      ["kabelnye-muftu", "Кабельные муфты"],
    ]),
  },
];

export function findCategory(slug: string | undefined): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function findSub(
  categorySlug: string | undefined,
  subSlug: string | undefined,
) {
  const category = findCategory(categorySlug);
  const sub = category?.subs.find((item) => item.slug === subSlug);

  if (!category || !sub) return undefined;
  return { category, sub };
}
