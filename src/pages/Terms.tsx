import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto max-w-4xl px-6 py-32">
        <h1 className="font-serif text-5xl font-bold mb-8">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: October 26, 2025</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using Malik's Blog, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access the website or services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Use License</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Permission is granted to temporarily access the materials on Malik's Blog for personal, 
              non-commercial viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes</li>
              <li>Remove any copyright or proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Digital Products</h2>
            <p className="text-muted-foreground leading-relaxed">
              All digital products (eBooks, audiobooks, courses, journals) are licensed, not sold. 
              You receive a non-transferable, non-exclusive license to use the product for personal use only.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Refund Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Due to the nature of digital products, all sales are final. However, if you experience 
              technical issues preventing access to your purchase, please contact us for assistance.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on Malik's Blog, including text, graphics, logos, images, videos, and software, 
              is the property of Malik Sali Akbar and is protected by copyright, trademark, and other 
              intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">User Conduct</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any portion of the website</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the website or servers</li>
              <li>Upload viruses or malicious code</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Print-on-Demand Products</h2>
            <p className="text-muted-foreground leading-relaxed">
              Print-on-demand merchandise is produced and shipped by third-party fulfillment partners. 
              Shipping times and costs vary by location. Returns and exchanges are handled according to 
              the fulfillment partner's policies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials on Malik's Blog are provided on an 'as is' basis. We make no warranties, 
              expressed or implied, and hereby disclaim all other warranties including, without limitation, 
              implied warranties of merchantability or fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall Malik's Blog or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit) arising out of the use or 
              inability to use the materials on our website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws 
              of Massachusetts, United States, and you irrevocably submit to the exclusive jurisdiction 
              of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, contact us at:
            </p>
            <p className="text-muted-foreground mt-4">
              Email: contact@maliksblog.com<br />
              Address: 1 Washington Mall #1243, Boston, MA 02108
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of the website 
              after changes constitutes acceptance of the modified terms.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
