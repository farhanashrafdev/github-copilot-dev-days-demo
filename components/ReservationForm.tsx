'use client';

import { useState } from 'react';
import { formatReservationDate, formatReservationTime } from '@/lib/format';
import type { ReservationFormValues, ReservationValidationErrors } from '@/lib/reservation';
import { validateReservation } from '@/lib/reservation';

const INITIAL_VALUES: ReservationFormValues = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  partySize: '2',
  notes: '',
};

type Submission = {
  name: string;
  date: string;
  time: string;
  partySize: string;
};

const FIELD_LABELS: Record<keyof ReservationFormValues, string> = {
  name: 'Name',
  email: 'Email address',
  phone: 'Phone number',
  date: 'Date',
  time: 'Time',
  partySize: 'Party size',
  notes: 'Notes',
};

function FieldError({
  field,
  errors,
}: {
  field: keyof ReservationValidationErrors;
  errors: ReservationValidationErrors;
}) {
  const message = errors[field];

  if (!message) {
    return null;
  }

  return (
    <p id={`${field}-error`} className="mt-2 text-sm font-medium text-rose-700" role="alert">
      {message}
    </p>
  );
}

export function ReservationForm() {
  const [values, setValues] = useState<ReservationFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ReservationValidationErrors>({});
  const [submission, setSubmission] = useState<Submission | null>(null);

  function updateValue<K extends keyof ReservationFormValues>(
    field: K,
    value: ReservationFormValues[K],
  ) {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  }

  function inputClassName(field: keyof ReservationValidationErrors) {
    return `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-lg text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-2 focus:outline-offset-0 focus:outline-indigo-500 ${
      errors[field] ? 'border-rose-500' : 'border-slate-300'
    }`;
  }

  function describedBy(field: keyof ReservationValidationErrors, hintId?: string) {
    return [hintId, errors[field] ? `${field}-error` : undefined].filter(Boolean).join(' ');
  }

  function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();

    const nextErrors = validateReservation(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmission(null);
      return;
    }

    setSubmission({
      name: values.name,
      date: values.date,
      time: values.time,
      partySize: values.partySize,
    });
    setValues(INITIAL_VALUES);
    setErrors({});
  }

  if (submission) {
    return (
      <div
        role="status"
        className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-8"
      >
        <h2 className="text-2xl font-bold text-emerald-900">
          Reservation request received
        </h2>
        <p className="mt-3 text-lg text-emerald-800">
          Thanks, {submission.name}. Your placeholder request for {submission.partySize}{' '}
          guests on {formatReservationDate(submission.date)} at{' '}
          {formatReservationTime(submission.time)} is ready for the owner to wire
          into a real booking workflow later.
        </p>
        <button
          type="button"
          onClick={() => setSubmission(null)}
          className="mt-6 rounded-xl bg-emerald-700 px-5 py-2.5 text-base font-bold text-white transition hover:bg-emerald-800 focus:outline-2 focus:outline-offset-2 focus:outline-emerald-700"
        >
          Request another table
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-base font-semibold text-slate-900">
          {FIELD_LABELS.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={(event) => updateValue('name', event.target.value)}
          placeholder="Alex Morgan"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy('name')}
          className={inputClassName('name')}
        />
        <FieldError field="name" errors={errors} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-base font-semibold text-slate-900">
            {FIELD_LABELS.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => updateValue('email', event.target.value)}
            placeholder="alex@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={inputClassName('email')}
          />
          <FieldError field="email" errors={errors} />
        </div>

        <div>
          <label htmlFor="phone" className="block text-base font-semibold text-slate-900">
            {FIELD_LABELS.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(event) => updateValue('phone', event.target.value)}
            placeholder="+44 20 7946 0123"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy('phone', 'phone-hint')}
            className={inputClassName('phone')}
          />
          <p id="phone-hint" className="mt-2 text-sm text-slate-500">
            Use a number with at least 10 digits, including spaces or country code if needed.
          </p>
          <FieldError field="phone" errors={errors} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="date" className="block text-base font-semibold text-slate-900">
            {FIELD_LABELS.date}
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={values.date}
            onChange={(event) => updateValue('date', event.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={describedBy('date')}
            className={inputClassName('date')}
          />
          <FieldError field="date" errors={errors} />
        </div>

        <div>
          <label htmlFor="time" className="block text-base font-semibold text-slate-900">
            {FIELD_LABELS.time}
          </label>
          <input
            id="time"
            name="time"
            type="time"
            value={values.time}
            onChange={(event) => updateValue('time', event.target.value)}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={describedBy('time')}
            className={inputClassName('time')}
          />
          <FieldError field="time" errors={errors} />
        </div>

        <div>
          <label
            htmlFor="partySize"
            className="block text-base font-semibold text-slate-900"
          >
            {FIELD_LABELS.partySize}
          </label>
          <input
            id="partySize"
            name="partySize"
            type="number"
            min="1"
            max="12"
            value={values.partySize}
            onChange={(event) => updateValue('partySize', event.target.value)}
            aria-invalid={Boolean(errors.partySize)}
            aria-describedby={describedBy('partySize')}
            className={inputClassName('partySize')}
          />
          <FieldError field="partySize" errors={errors} />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-base font-semibold text-slate-900">
          {FIELD_LABELS.notes} <span className="text-slate-500">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={values.notes}
          onChange={(event) => updateValue('notes', event.target.value)}
          placeholder="Allergies, accessibility needs, or a special occasion"
          className={inputClassName('notes')}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-lg font-bold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
      >
        Request reservation
      </button>
    </form>
  );
}
