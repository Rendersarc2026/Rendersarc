import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black/10">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-32 md:py-48">
        <h1 className="text-4xl md:text-6xl font-[700] mb-12">Privacy <span className="text-black">Policy</span></h1>
        
        <div className="space-y-8 text-black/65 leading-relaxed font-[400]">
          <section>
            <h2 className="text-2xl text-black mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you request a quote, fill out a form, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.</p>
          </section>

          <section>
            <h2 className="text-2xl text-black mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you related information, and to respond to your comments, questions, and requests.</p>
          </section>

          <section>
            <h2 className="text-2xl text-black mb-4">3. Information Sharing</h2>
            <p>We do not share your personal information with third parties except as described in this privacy policy, such as with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</p>
          </section>

          <section>
            <h2 className="text-2xl text-black mb-4">4. Security</h2>
            <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
          </section>

          <section>
            <h2 className="text-2xl text-black mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at rendersarcmail@gmail.com.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
