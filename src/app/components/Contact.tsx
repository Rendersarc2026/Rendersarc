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
    { icon: Mail, title: 'Email', content: 'rendersarcmail@gmail.com' },
    { icon: Phone, title: 'Phone', content: '+91 81293 21539' },
    { icon: MapPin, title: 'Location', content: 'G-48, 1st Cross Rd, Panampilly Nagar, Kochi, Ernakulam, Kerala 682036' },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 px-6 bg-[#000000] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#00ea77]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-[#00ea77]" />
            <span className="text-[#00ea77] text-xs tracking-widest uppercase font-bold drop-shadow-[0_0_8px_rgba(0,234,119,0.5)]">
              Contact
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-extralight text-white">
            Let's {' '}
            <span className="text-[#00ea77] drop-shadow-[0_0_15px_rgba(0,234,119,0.4)]">
              connect
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="leading-relaxed mb-12 text-base md:text-lg font-light text-white/50">
              Ready to bring your vision to life? We'd love to hear about your project. Our team
              is ready to answer any questions and guide you from concept to completion.
            </p>
            <div className="space-y-8">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-5 group">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#0a0a0a] border border-white/10 group-hover:border-[#00ea77]/50 transition-colors duration-300"
                    >
                      <Icon size={20} className="text-white/60 group-hover:text-[#00ea77] transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1 text-white/40">
                        {item.title}
                      </p>
                      <p className="text-base text-white font-light group-hover:text-[#00ea77]/80 transition-colors duration-300">{item.content}</p>
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
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="rounded-3xl p-8 md:p-10 bg-[#0a0a0a] border border-white/5 relative overflow-hidden"
            >
              {/* Inner subtle glow for the card */}
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#00ea77]/20 to-transparent" />

              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center min-h-[420px] text-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-[#00ea77]/10 border border-[#00ea77]/30"
                  >
                    <Check size={36} className="text-[#00ea77]" />
                  </div>
                  <h3 className="text-3xl mb-3 font-extralight text-white">Message Sent!</h3>
                  <p className="text-white/50 text-lg">We'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <form suppressHydrationWarning onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl text-sm bg-red-500/10 border border-red-500/30 text-red-500 font-medium"
                    >
                      {error}
                    </motion.div>
                  )}
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                      { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                      { id: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?' },
                    ].map((field) => (
                      <div key={field.id} className="group/input">
                        <label
                          htmlFor={field.id}
                          className="block text-xs uppercase tracking-widest mb-2 font-medium text-white/40 group-focus-within/input:text-[#00ea77] transition-colors"
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
                          className="w-full px-5 py-4 rounded-xl outline-none transition-all text-base bg-white/[0.03] border border-white/10 text-white placeholder:text-white/40 focus:border-[#00ea77]/50 focus:bg-white/[0.05]"
                        />
                      </div>
                    ))}
                    <div className="group/input">
                      <label htmlFor="message" className="block text-xs uppercase tracking-widest mb-2 font-medium text-white/40 group-focus-within/input:text-[#00ea77] transition-colors">
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
                        className="w-full px-5 py-4 rounded-xl outline-none transition-all resize-none text-base bg-white/[0.03] border border-white/10 text-white placeholder:text-white/40 focus:border-[#00ea77]/50 focus:bg-white/[0.05]"
                      />
                    </div>
                  </div>
                  <motion.button
                    suppressHydrationWarning
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors text-base tracking-widest uppercase font-medium disabled:opacity-70 bg-[#00ea77] text-black hover:bg-[#00ea77]/90 drop-shadow-[0_0_15px_rgba(0,234,119,0.2)] hover:drop-shadow-[0_0_20px_rgba(0,234,119,0.4)] mt-4"
                    whileHover={{ scale: sending ? 1 : 1.02 }}
                    whileTap={{ scale: sending ? 1 : 0.98 }}
                  >
                    {sending ? (
                      <>
                        Sending...
                        <Loader2 size={18} className="animate-spin text-black" />
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
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
