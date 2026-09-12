export type DietaryTag = 'Vegetarian' | 'Vegan' | 'Gluten-free';
export type MenuCategory = 'Starters' | 'Mains' | 'Desserts' | 'Drinks';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  category: MenuCategory;
  dietaryTags: DietaryTag[];
  spicy?: boolean;
  featured?: boolean;
};

export type OpeningHours = {
  day: string;
  opensAt: string | null;
  closesAt: string | null;
  summary: string;
};

export const RESTAURANT = {
  name: 'The Copper Spoon',
  tagline: 'Neighbourhood dining with bright flavours and late-evening warmth.',
  description:
    'A placeholder bistro website for a restaurant relaunch. Replace this name, the copy, contact details, opening hours, and menu items with the owner’s real brand before going live.',
  address: '18 Market Lane, Manchester M1 2AB',
  phone: '+44 20 7946 0123',
  email: 'hello@thecopperspoon.example.com',
  highlights: [
    {
      title: 'Seasonal small plates',
      body: 'A concise menu built around produce-led starters, vibrant mains, and simple desserts.',
    },
    {
      title: 'Friendly reservations',
      body: 'Guests can request a table online with clear validation and a no-surprises browser-only flow.',
    },
    {
      title: 'Static and fast',
      body: 'Every page is powered by typed placeholder data in `lib/`, so preview deployments stay instant.',
    },
  ],
} as const;

export const OPENING_HOURS: readonly OpeningHours[] = [
  { day: 'Sunday', opensAt: '12:00', closesAt: '19:30', summary: '12:00–19:30' },
  { day: 'Monday', opensAt: null, closesAt: null, summary: 'Closed' },
  { day: 'Tuesday', opensAt: '17:00', closesAt: '21:30', summary: '17:00–21:30' },
  {
    day: 'Wednesday',
    opensAt: '17:00',
    closesAt: '21:30',
    summary: '17:00–21:30',
  },
  { day: 'Thursday', opensAt: '17:00', closesAt: '21:30', summary: '17:00–21:30' },
  { day: 'Friday', opensAt: '12:00', closesAt: '22:00', summary: '12:00–22:00' },
  { day: 'Saturday', opensAt: '12:00', closesAt: '22:00', summary: '12:00–22:00' },
] as const;

export const MENU_ITEMS: readonly MenuItem[] = [
  {
    id: 'focaccia',
    name: 'Rosemary focaccia',
    description: 'Warm bread with whipped brown butter and sea salt.',
    priceInCents: 650,
    category: 'Starters',
    dietaryTags: ['Vegetarian'],
    featured: true,
  },
  {
    id: 'tomato-soup',
    name: 'Charred tomato soup',
    description: 'Slow-roasted tomatoes, basil oil, and toasted seeds.',
    priceInCents: 780,
    category: 'Starters',
    dietaryTags: ['Vegan', 'Gluten-free'],
  },
  {
    id: 'calamari',
    name: 'Crispy calamari',
    description: 'Lemon aioli, parsley, and pickled fennel.',
    priceInCents: 920,
    category: 'Starters',
    dietaryTags: [],
  },
  {
    id: 'burger',
    name: 'Copper Spoon burger',
    description: 'Dry-aged beef, smoked cheddar, onion jam, and fries.',
    priceInCents: 1850,
    category: 'Mains',
    dietaryTags: [],
    featured: true,
  },
  {
    id: 'pappardelle',
    name: 'Wild mushroom pappardelle',
    description: 'Creamy tarragon sauce with roasted chestnut mushrooms.',
    priceInCents: 1690,
    category: 'Mains',
    dietaryTags: ['Vegetarian'],
  },
  {
    id: 'salmon',
    name: 'Herb-roasted salmon',
    description: 'Crushed potatoes, green beans, and caper butter.',
    priceInCents: 2140,
    category: 'Mains',
    dietaryTags: ['Gluten-free'],
  },
  {
    id: 'tagine',
    name: 'Harissa aubergine tagine',
    description: 'Apricot, chickpea, and coriander with toasted almonds.',
    priceInCents: 1720,
    category: 'Mains',
    dietaryTags: ['Vegan', 'Gluten-free'],
    spicy: true,
    featured: true,
  },
  {
    id: 'chicken',
    name: 'Roast chicken supreme',
    description: 'Butter beans, cavolo nero, and chicken jus.',
    priceInCents: 1980,
    category: 'Mains',
    dietaryTags: ['Gluten-free'],
  },
  {
    id: 'lemon-tart',
    name: 'Burnt lemon tart',
    description: 'Crème fraîche and candied citrus.',
    priceInCents: 780,
    category: 'Desserts',
    dietaryTags: ['Vegetarian'],
  },
  {
    id: 'mousse',
    name: 'Dark chocolate mousse',
    description: 'Sea salt, olive oil, and cocoa nibs.',
    priceInCents: 820,
    category: 'Desserts',
    dietaryTags: ['Gluten-free'],
  },
  {
    id: 'panna-cotta',
    name: 'Vanilla panna cotta',
    description: 'Poached pear and toasted pistachio.',
    priceInCents: 760,
    category: 'Desserts',
    dietaryTags: ['Gluten-free'],
  },
  {
    id: 'elderflower',
    name: 'Sparkling elderflower',
    description: 'Fresh lemon and mint over ice.',
    priceInCents: 450,
    category: 'Drinks',
    dietaryTags: ['Vegan', 'Gluten-free'],
  },
  {
    id: 'lemonade',
    name: 'House lemonade',
    description: 'Still lemonade with thyme syrup.',
    priceInCents: 420,
    category: 'Drinks',
    dietaryTags: ['Vegan', 'Gluten-free'],
  },
  {
    id: 'espresso',
    name: 'Double espresso',
    description: 'Locally roasted coffee, served short.',
    priceInCents: 340,
    category: 'Drinks',
    dietaryTags: ['Vegan', 'Gluten-free'],
  },
] as const;

const MENU_CATEGORIES: readonly MenuCategory[] = [
  'Starters',
  'Mains',
  'Desserts',
  'Drinks',
];

function parseTimeToMinutes(time: string): number {
  const [hourPart, minutePart] = time.split(':');
  const hours = Number(hourPart);
  const minutes = Number(minutePart);

  return hours * 60 + minutes;
}

export function getMenuByCategory() {
  return MENU_CATEGORIES.map((category) => ({
    category,
    items: MENU_ITEMS.filter((item) => item.category === category),
  }));
}

export function getHoursForDay(day: number | Date) {
  const dayIndex = day instanceof Date ? day.getUTCDay() : day;

  return OPENING_HOURS[dayIndex];
}

export function isOpenNow(date: Date) {
  const hours = getHoursForDay(date);

  if (!hours?.opensAt || !hours.closesAt) {
    return false;
  }

  const currentMinutes = date.getUTCHours() * 60 + date.getUTCMinutes();

  return (
    currentMinutes >= parseTimeToMinutes(hours.opensAt) &&
    currentMinutes < parseTimeToMinutes(hours.closesAt)
  );
}

export function isWithinOpeningHours(day: number, time: string) {
  const hours = getHoursForDay(day);

  if (!hours?.opensAt || !hours.closesAt) {
    return false;
  }

  const requestedMinutes = parseTimeToMinutes(time);

  return (
    requestedMinutes >= parseTimeToMinutes(hours.opensAt) &&
    requestedMinutes < parseTimeToMinutes(hours.closesAt)
  );
}
