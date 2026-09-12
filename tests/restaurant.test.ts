import { describe, expect, it } from 'vitest';
import { formatPrice } from '@/lib/format';
import { MENU_ITEMS, getHoursForDay, getMenuByCategory, isOpenNow } from '@/lib/restaurant';

describe('getMenuByCategory', () => {
  it('groups every menu item under its category in display order', () => {
    const groupedMenu = getMenuByCategory();

    expect(groupedMenu.map((group) => group.category)).toEqual([
      'Starters',
      'Mains',
      'Desserts',
      'Drinks',
    ]);
    expect(groupedMenu.flatMap((group) => group.items)).toHaveLength(MENU_ITEMS.length);
    expect(groupedMenu[0]?.items.every((item) => item.category === 'Starters')).toBe(true);
    expect(groupedMenu[1]?.items.every((item) => item.category === 'Mains')).toBe(true);
  });
});

describe('formatPrice', () => {
  it('formats pence values as GBP currency', () => {
    expect(formatPrice(1850)).toBe('£18.50');
    expect(formatPrice(340)).toBe('£3.40');
  });
});

describe('getHoursForDay', () => {
  it('returns the configured opening hours for a day index', () => {
    expect(getHoursForDay(1)).toMatchObject({ day: 'Monday', summary: 'Closed' });
    expect(getHoursForDay(5)).toMatchObject({ day: 'Friday', summary: '12:00–22:00' });
  });
});

describe('isOpenNow', () => {
  it('returns true during service hours', () => {
    expect(isOpenNow(new Date('2026-09-11T18:30:00.000Z'))).toBe(true);
  });

  it('treats opening time as inclusive and closing time as exclusive', () => {
    expect(isOpenNow(new Date('2026-09-12T12:00:00.000Z'))).toBe(true);
    expect(isOpenNow(new Date('2026-09-12T22:00:00.000Z'))).toBe(false);
  });

  it('returns false when the restaurant is closed', () => {
    expect(isOpenNow(new Date('2026-09-14T18:30:00.000Z'))).toBe(false);
    expect(isOpenNow(new Date('2026-09-11T22:15:00.000Z'))).toBe(false);
  });
});
