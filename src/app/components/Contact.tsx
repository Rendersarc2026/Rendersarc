'use client';

import { Loader2, MoveRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

const FIELDS = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
  { id: 'phone', label: 'Phone', type: 'tel', placeholder: 'Your mobile number' },
  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?' },
] as const;

const contactInfo = [
  { title: 'Email', content: 'rendersarcmail@gmail.com', href: 'mailto:rendersarcmail@gmail.com' },
  { title: 'Phone', content: '+91 81293 21539', href: 'tel:+918129321539' },
  {
    title: 'Location',
    content: 'G-48, 1st Cross Rd, Panampilly Nagar, Kochi, Ernakulam, Kerala 682036',
  },
];

/** Filled field on the panel, with the focus ring doing the work. */
const inputClass = (invalid: boolean) =>
  `w-full bg-white border px-4 py-3.5 text-base text-black placeholder:text-black/30 outline-none transition-all duration-200 ${
    invalid
      ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]'
      : 'border-black/10 hover:border-black/20 focus:border-black focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)]'
  }`;

const labelClass = 'mb-2 block text-[11px] uppercase tracking-[0.2em] text-black/45';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject and Message validation
    if (!formData.subject || formData.subject.trim().length === 0) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message || formData.message.trim().length === 0) {
      newErrors.message = 'Message is required';
    }

    // Phone validation (required)
    if (!formData.phone || formData.phone.trim().length === 0) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm())
      return;

    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success('Message sent successfully! We will get back to you shortly.', {
        duration: 5000,
      });

      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <section id="contact-form" className="bg-white px-6 md:px-10 lg:px-16 xl:px-24 pb-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-16 lg:gap-24 pt-16 md:pt-24 border-t border-black/10">
        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-sm md:text-base leading-relaxed text-black/55 max-w-[38ch]">
            Tell us about the project. We answer every enquiry ourselves, usually within a day.
          </p>

          <dl className="mt-12 space-y-8">
            {contactInfo.map((item) => (
              <div key={item.title}>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-black/40">
                  {item.title}
                </dt>
                <dd className="mt-2 text-sm md:text-base text-black leading-relaxed">
                  {item.href ? (
                    <a href={item.href} className="hover:opacity-60 transition-opacity">
                      {item.content}
                    </a>
                  ) : (
                    item.content
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Form */}
        <motion.form
          suppressHydrationWarning
          noValidate
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="bg-[#f4f4f4] p-6 sm:p-8 md:p-12"
        >
          {error && (
            <p className="mb-8 text-sm text-red-500">{error}</p>
          )}

          <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
            {FIELDS.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className={labelClass}>
                  {field.label}
                </label>
                <input
                  suppressHydrationWarning
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  aria-invalid={errors[field.id] ? true : undefined}
                  className={inputClass(Boolean(errors[field.id]))}
                />
                {errors[field.id] && (
                  <p className="mt-2 text-xs text-red-500">{errors[field.id]}</p>
                )}
              </div>
            ))}

            <div className="md:col-span-2">
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea
                suppressHydrationWarning
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us about your project"
                aria-invalid={errors.message ? true : undefined}
                className={`${inputClass(Boolean(errors.message))} resize-none`}
              />
              {errors.message && (
                <p className="mt-2 text-xs text-red-500">{errors.message}</p>
              )}
            </div>
          </div>

          <button
            suppressHydrationWarning
            type="submit"
            disabled={sending}
            className="mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-black px-10 py-4 text-[13px] font-[600] uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.28)] disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            {sending ? (
              <>
                Sending
                <Loader2 size={16} className="animate-spin" aria-hidden />
              </>
            ) : (
              <>
                Send message
                <MoveRight size={16} strokeWidth={2} aria-hidden />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
