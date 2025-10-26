import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto max-w-4xl px-6 py-32">
        <h1 className="font-serif text-5xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: October 26, 2025</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Malik's Blog ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Personal identification information (name, email address)</li>
              <li>Payment information (processed securely through third-party payment processors)</li>
              <li>Usage data (how you interact with our website)</li>
              <li>Device information (browser type, IP address)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the collected information for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Processing orders and delivering digital products</li>
              <li>Sending newsletters and marketing communications (with your consent)</li>
              <li>Improving our website and user experience</li>
              <li>Responding to customer inquiries and support requests</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate security measures to protect your personal information. However, 
              no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may use third-party services (payment processors, email providers, analytics tools) that have 
              their own privacy policies. We encourage you to review their policies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies to enhance your browsing experience. You can control cookie preferences through 
              your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy-related questions or to exercise your rights, contact us at:
            </p>
            <p className="text-muted-foreground mt-4">
              Email: contact@maliksblog.com<br />
              Address: 1 Washington Mall #1243, Boston, MA 02108
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy from time to time. Changes will be posted on this page 
              with an updated revision date.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
