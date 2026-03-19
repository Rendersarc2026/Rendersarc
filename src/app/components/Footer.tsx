import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
  ];

  return (
    <footer style={{ backgroundColor: '#1E2130', borderTop: '1px solid rgba(139,123,106,0.2)' }}>
      {/* Massive brand name */}
      <div className="overflow-hidden" style={{ borderBottom: '1px solid rgba(139,123,106,0.12)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 py-16"
        >
          <h2
            className="text-[6rem] md:text-[10rem] lg:text-[14rem] leading-none tracking-tighter text-center select-none"
            style={{ color: 'rgba(139,123,106,0.07)' }}
          >
            GROWAZ
          </h2>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            className="col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-xl tracking-widest uppercase mb-4"
              style={{ color: '#DDD0BC' }}
            >
              Growaz
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#8B7B6A' }}>
              Designing digital futures with innovation and precision.
            </p>
            {/* Gold accent line */}
            <div
              className="mt-6 h-px w-10"
              style={{ backgroundColor: '#8B7B6A' }}
            />
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4
              className="text-xs uppercase tracking-widest mb-6"
              style={{ color: '#8B7B6A' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {['About', 'Services', 'Work', 'Careers'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm transition-colors"
                    style={{ color: '#8B7B6A' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#DDD0BC';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#8B7B6A';
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4
              className="text-xs uppercase tracking-widest mb-6"
              style={{ color: '#8B7B6A' }}
            >
              Resources
            </h4>
            <ul className="space-y-3">
              {['Blog', 'Case Studies', 'Support', 'Privacy'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm transition-colors"
                    style={{ color: '#8B7B6A' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#DDD0BC';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#8B7B6A';
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4
              className="text-xs uppercase tracking-widest mb-6"
              style={{ color: '#8B7B6A' }}
            >
              Contact
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: '#8B7B6A' }}>
              <li>hello@growaz.com</li>
              <li>+1 (555) 123-4567</li>
              <li className="pt-4">
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all group"
                        style={{
                          border: '1px solid rgba(139,123,106,0.3)',
                          backgroundColor: 'transparent',
                        }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#8B7B6A';
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = '#8B7B6A';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(139,123,106,0.3)';
                        }}
                      >
                        <Icon size={15} style={{ color: '#8B7B6A' }} />
                      </motion.a>
                    );
                  })}
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="pt-8"
          style={{ borderTop: '1px solid rgba(139,123,106,0.15)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: '#8B7B6A' }}>
              © {currentYear} Growaz. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              {['Terms', 'Privacy', 'Cookies'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="transition-colors"
                  style={{ color: '#8B7B6A' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#DDD0BC';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#8B7B6A';
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
