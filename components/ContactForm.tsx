'use client';

import { useMemo, useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const canSubmit = useMemo(() => {
    const emailOk = /^\S+@\S+\.\S+$/.test(form.email.trim());
    return (
      form.name.trim().length >= 2 &&
      emailOk &&
      form.subject.trim().length >= 2 &&
      form.message.trim().length >= 10
    );
  }, [form]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus('sending');

    // TODO: ovde kasnije povežeš API (route handler / mail service)
    await new Promise((r) => setTimeout(r, 600));

    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <form onSubmit={onSubmit} className='space-y-5'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
        <Field
          label='Name'
          value={form.name}
          onChange={(v) => setForm((p) => ({ ...p, name: v }))}
          placeholder='Your name'
        />
        <Field
          label='Email'
          value={form.email}
          onChange={(v) => setForm((p) => ({ ...p, email: v }))}
          placeholder='you@email.com'
          type='email'
        />
      </div>

      <Field
        label='Subject'
        value={form.subject}
        onChange={(v) => setForm((p) => ({ ...p, subject: v }))}
        placeholder='How can we help?'
      />

      <div>
        <label className='block text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
          Message
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          placeholder='Tell us a bit more…'
          rows={6}
          className='mt-3 w-full rounded-2xl border border-[#1C1C1C]/15 bg-white px-4 py-3 text-sm text-[#1C1C1C] outline-none focus:border-[#1C1C1C]/35'
        />
        <p className='mt-2 text-xs text-[#2A2A2A]/60'>Minimum 10 characters.</p>
      </div>

      {status === 'success' && (
        <div className='rounded-2xl border border-emerald-500/20 bg-emerald-50 px-4 py-3 text-sm text-emerald-900'>
          Message sent! We’ll reply soon.
        </div>
      )}

      {status === 'error' && (
        <div className='rounded-2xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm text-red-900'>
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type='submit'
        disabled={!canSubmit || status === 'sending'}
        className={`inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-xs uppercase tracking-[0.18em] transition ${
          !canSubmit || status === 'sending'
            ? 'bg-[#1C1C1C]/20 text-white cursor-not-allowed'
            : 'bg-[#1C1C1C] text-white hover:opacity-90'
        }`}
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className='block text-xs uppercase tracking-[0.2em] text-[#2A2AA]/70'>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='mt-3 w-full rounded-2xl border border-[#1C1C1C]/15 bg-white px-4 py-3 text-sm text-[#1C1C1C] outline-none focus:border-[#1C1C1C]/35'
      />
    </div>
  );
}
