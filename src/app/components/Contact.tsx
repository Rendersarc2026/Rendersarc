'use client';

import { Mail, Phone, MapPin, Send, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, title: 'Email', content: 'hello@rendersarc.com' },
    { icon: Phone, title: 'Phone', content: '+1 (555) 123-4567' },
    { icon: MapPin, title: 'Location', content: '123 Design Street, Creative City, CA 94000' },
  ];

  return (
    <section id="contact" className="py-32 px-6" style={{ backgroundColor: '#0D0D0D' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <span style={{ color: 'rgba(255,255,255,0.4)' }} className="text-xs tracking-widest uppercase">
              Contact
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl leading-tight" style={{ color: '#FFFFFF' }}>
            Let's create{' '}
            <span className="italic font-serif" style={{ color: 'rgba(255,255,255,0.45)' }}>
              together
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="leading-relaxed mb-12 text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Ready to bring your vision to life? We'd love to hear about your project. Our team
              is ready to answer any questions and guide you from concept to completion.
            </p>
            <div className="space-y-8">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <Icon size={18} style={{ color: 'rgba(255,255,255,0.6)' }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {item.title}
                      </p>
                      <p className="text-sm" style={{ color: '#FFFFFF' }}>{item.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center min-h-[420px] text-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: '#FFFFFF' }}
                  >
                    <Check size={28} style={{ color: '#000000' }} />
                  </div>
                  <h3 className="text-2xl mb-2" style={{ color: '#FFFFFF' }}>Message Sent!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)' }}>We'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <form suppressHydrationWarning onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl text-sm"
                      style={{ backgroundColor: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.3)', color: '#FF4D4D' }}
                    >
                      {error}
                    </motion.div>
                  )}
                  {[
                    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                    { id: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?' },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block text-xs uppercase tracking-widest mb-2"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                      >
                        {field.label}
                      </label>
                      <input
                        suppressHydrationWarning
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={handleChange}
                        required
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-xl outline-none transition text-sm"
                        style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Message
                    </label>
                    <textarea
                      suppressHydrationWarning
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="w-full px-4 py-3 rounded-xl outline-none transition resize-none text-sm"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    />
                  </div>
                  <motion.button
                    suppressHydrationWarning
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-all text-sm tracking-widest uppercase font-semibold disabled:opacity-70"
                    style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                    whileHover={{ scale: sending ? 1 : 1.01 }}
                    whileTap={{ scale: sending ? 1 : 0.99 }}
                    onMouseEnter={(e) => { if (!sending) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E5E5'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FFFFFF'; }}
                  >
                    {sending ? (
                      <>
                        Sending...
                        <Loader2 size={15} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={15} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
