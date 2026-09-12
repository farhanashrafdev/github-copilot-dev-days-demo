/**
 * Registration form validation.
 *
 * Pure, browser-free validation helpers for the new patient registration form.
 * Keeping the rules here (rather than inside the client component) means they
 * can be unit-tested in the fast Node test suite and reused without pulling in
 * a DOM environment.
 */

export type RegistrationInput = {
  ownerName: string;
  email: string;
  petName: string;
};

export type RegistrationErrors = {
  ownerName?: string;
  email?: string;
  petName?: string;
};

/**
 * Whether a string is an obviously valid email address.
 *
 * This is a deliberately conservative check: it rejects addresses that are
 * clearly wrong (missing an `@`, a local part, a domain, or a dot in the
 * domain, or that contain whitespace) while accepting ordinary real addresses.
 * It is not a full RFC 5322 parser and does not try to be.
 */
export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

/**
 * Validate the registration fields, returning a message for each field that is
 * wrong. An empty object means the input is valid and the form may submit.
 */
export function validateRegistration(input: RegistrationInput): RegistrationErrors {
  const errors: RegistrationErrors = {};

  if (input.ownerName.trim().length === 0) {
    errors.ownerName = 'Please enter your name.';
  }

  if (input.email.trim().length === 0) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(input.email)) {
    errors.email = 'Please enter a valid email address, like priya.sharma@example.com.';
  }

  if (input.petName.trim().length === 0) {
    errors.petName = 'Please enter your cat\u2019s name.';
  }

  return errors;
}
