import { describe, expect, it } from 'vitest';
import { isValidEmail, validateRegistration } from '@/lib/registration';

describe('isValidEmail', () => {
  it('accepts an ordinary address', () => {
    expect(isValidEmail('priya.sharma@example.com')).toBe(true);
  });

  it('rejects text with no @ or domain', () => {
    expect(isValidEmail('asdasd')).toBe(false);
  });

  it('rejects an address with a missing domain dot', () => {
    expect(isValidEmail('priya@localhost')).toBe(false);
  });

  it('rejects addresses with whitespace', () => {
    expect(isValidEmail('priya sharma@example.com')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('   ')).toBe(false);
  });
});

describe('validateRegistration', () => {
  it('accepts a fully valid registration', () => {
    const errors = validateRegistration({
      ownerName: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      petName: 'Mochi',
    });

    expect(errors).toEqual({});
  });

  it('rejects an invalid email while other fields are fine', () => {
    const errors = validateRegistration({
      ownerName: 'Priya Sharma',
      email: 'asdasd',
      petName: 'Mochi',
    });

    expect(errors.email).toBeDefined();
    expect(errors.ownerName).toBeUndefined();
    expect(errors.petName).toBeUndefined();
  });

  it('requires the owner name and the pet name', () => {
    const errors = validateRegistration({
      ownerName: '   ',
      email: 'priya.sharma@example.com',
      petName: '',
    });

    expect(errors.ownerName).toBeDefined();
    expect(errors.petName).toBeDefined();
    expect(errors.email).toBeUndefined();
  });
});
