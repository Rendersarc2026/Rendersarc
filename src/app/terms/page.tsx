import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#00ea77]/30">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-32 md:py-48">
        <h1 className="text-4xl md:text-6xl font-light mb-12">Terms & <span className="text-[#00ea77]">Conditions</span></h1>
        
        <div className="space-y-8 text-white/70 leading-relaxed font-light">
          <section>
            <h2 className="text-2xl text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">2. Description of Service</h2>
            <p>Renders Arc provides digital design, web development, app development, and brand strategy services. We reserve the right to modify or discontinue, temporarily or permanently, the services with or without notice.</p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">3. Intellectual Property</h2>
            <p>All content, designs, code, and other materials produced by Renders Arc remain the intellectual property of Renders Arc until full payment is received, at which point the agreed-upon rights are transferred to the client.</p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">4. Limitation of Liability</h2>
            <p>Renders Arc shall not be liable for any indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses.</p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">5. Contact Information</h2>
            <p>For any questions regarding these terms, please contact us at rendersarcmail@gmail.com.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
