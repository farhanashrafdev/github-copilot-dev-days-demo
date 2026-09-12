import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import SchedulePage from '@/app/schedule/page';
import { APPOINTMENTS, slotOccupancy } from '@/lib/clinic';

function renderSchedulePage(): string {
  return renderToStaticMarkup(createElement(SchedulePage));
}

describe('schedule page', () => {
  it('shows a clear message for every slot with no appointments', () => {
    const html = renderSchedulePage();
    const emptySlots = slotOccupancy().filter((slot) => slot.booked === 0);

    expect(emptySlots.length).toBeGreaterThan(0);

    const messageCount = html.split('No appointments booked yet.').length - 1;
    expect(messageCount).toBe(emptySlots.length);
  });

  it('leaves slots with appointments unchanged', () => {
    const html = renderSchedulePage();

    for (const appointment of APPOINTMENTS) {
      expect(html).toContain(appointment.reason);
    }
  });
});
