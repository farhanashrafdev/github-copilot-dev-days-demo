'use client';

import { useState } from 'react';

import { SPECIES_EMOJI, SPECIES_LABELS, SUPPORTED_SPECIES } from '@/lib/types';
import type { Species } from '@/lib/types';

type Submission = {
  ownerName: string;
  email: string;
  petName: string;
  species: Species;
};

/**
 * New patient registration.
 *
 * Collects the owner's contact details and the pet's name, then shows a
 * confirmation. This is a front-end demonstration: nothing is persisted and no
 * request leaves the browser.
 */
export function RegisterForm() {
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState<Species>('cat');
  const [submission, setSubmission] = useState<Submission | null>(null);

  function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setSubmission({ ownerName, email, petName, species });
  }

  if (submission) {
    return (
      <div
        role="status"
        className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-8"
      >
        <p className="text-5xl" aria-hidden="true">
          🎉
        </p>
        <h2 className="mt-4 text-2xl font-bold text-emerald-900">
          {submission.petName} is registered as a{' '}
          {SPECIES_LABELS[submission.species].toLowerCase()}
        </h2>
        <p className="mt-2 text-lg text-emerald-800">
          We have sent a confirmation to {submission.email}.
        </p>
        <button
          type="button"
          onClick={() => setSubmission(null)}
          className="mt-6 rounded-xl bg-emerald-700 px-5 py-2.5 text-base font-bold text-white transition hover:bg-emerald-800 focus:outline-2 focus:outline-offset-2 focus:outline-emerald-700"
        >
          Register another pet
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label
          htmlFor="ownerName"
          className="block text-base font-semibold text-slate-900"
        >
          Your name
        </label>
        <input
          id="ownerName"
          name="ownerName"
          type="text"
          value={ownerName}
          onChange={(changeEvent) => setOwnerName(changeEvent.target.value)}
          placeholder="Priya Sharma"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-2 focus:outline-offset-0 focus:outline-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-base font-semibold text-slate-900"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={(changeEvent) => setEmail(changeEvent.target.value)}
          placeholder="priya.sharma@example.com"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-2 focus:outline-offset-0 focus:outline-indigo-500"
        />
        <p className="mt-2 text-sm text-slate-500">
          We will send the appointment confirmation here.
        </p>
      </div>

      <div>
        <label
          htmlFor="petName"
          className="block text-base font-semibold text-slate-900"
        >
          Your pet&apos;s name
        </label>
        <input
          id="petName"
          name="petName"
          type="text"
          value={petName}
          onChange={(changeEvent) => setPetName(changeEvent.target.value)}
          placeholder="Mochi"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-2 focus:outline-offset-0 focus:outline-indigo-500"
        />
      </div>

      <fieldset>
        <legend className="block text-base font-semibold text-slate-900">
          Species
        </legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {SUPPORTED_SPECIES.map((supported) => (
            <label
              key={supported}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 has-checked:border-indigo-500 has-checked:bg-indigo-50 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600"
            >
              <input
                type="radio"
                name="species"
                value={supported}
                checked={species === supported}
                onChange={() => setSpecies(supported)}
                className="size-5 accent-indigo-600"
              />
              <span aria-hidden="true">{SPECIES_EMOJI[supported]}</span>
              <span>{SPECIES_LABELS[supported]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-lg font-bold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
      >
        Register
      </button>
    </form>
  );
}
