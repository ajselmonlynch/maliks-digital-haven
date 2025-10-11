import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import rebirthHero from "@/assets/rebirth-hero.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${rebirthHero})` }}
      >
        <div className="text-center animate-fade-in">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4">
            The Rebirth of Malik
          </h1>
          <p className="font-serif text-xl md:text-2xl italic text-white/90">
            A story of loss, truth, and transformation.
          </p>
        </div>
      </section>

      <main className="py-20">
        <div className="container mx-auto px-6">
          <article className="max-w-4xl mx-auto">
            {/* Opening */}
            <div className="mb-16 space-y-6 text-lg leading-relaxed">
              <p>
                There was a moment in my life that reshaped everything I thought I knew about who I was.
                That moment came after my mother passed away.
              </p>
              <p>
                Losing her didn't just change me—it dismantled me. When the person who gave you life is no longer here, you realize how much of your strength was borrowed from their presence. Suddenly, I had to learn to stand on my own. To guide myself. To feed myself. To become my own source of peace, love, and direction.
              </p>
              <p className="font-semibold text-xl">
                That's when I was reborn.
              </p>
              <p>
                The man you see now was forged in that fire.<br />
                I took my pain and turned it into purpose.<br />
                My rage became the forge that shaped a new identity—one built on resilience, accountability, and truth.
              </p>
              <p>
                Through that process, I discovered that the only thing stronger than grief is growth.
              </p>
            </div>

            <hr className="border-border my-16" />

            {/* Standing in Truth */}
            <div className="mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
                Standing in Truth
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-lg leading-relaxed">
                <div className="space-y-6">
                  <p>
                    I live by one rule: if I can tell myself the truth, then I can tell the world the truth.
                  </p>
                  <p>
                    Truth isn't personal or optional—it's absolute.<br />
                    It's what's real versus what's fake.<br />
                    And I want to be remembered as a man who stood in truth, not perfection.
                  </p>
                  <p>
                    Righteousness can be debated; truth cannot.<br />
                    I hold myself and those around me accountable, not from judgment, but from reality.
                  </p>
                </div>
                <div className="space-y-6">
                  <p>
                    Because the one thing we all share is life itself—and the certainty that none of us make it out alive.
                  </p>
                  <p>
                    So if you only get one chance at this, why live it as a lie?<br />
                    Ignorance isn't bliss—it's bondage.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-border my-16" />

            {/* Through My Eyes */}
            <div className="mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
                Through My Eyes
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-lg leading-relaxed">
                <div className="space-y-6">
                  <p>
                    What I'm building now—this blog, this body of work—isn't just content.<br />
                    It's a lens.<br />
                    A way for people to see the world as I see it.
                  </p>
                  <p>
                    When I walk through Boston with my Meta glasses on, every interaction tells a story.
                    Some are kind, some are cruel, some are real and raw.
                  </p>
                </div>
                <div className="space-y-6">
                  <p>
                    But together, they reveal the truth about the world we live in—and the truth about ourselves.
                  </p>
                  <p>
                    My life is my lens.<br />
                    My legacy is perspective.<br />
                    I want people to understand that through my eyes, you're not just seeing me—you're seeing the world as it really is.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-border my-16" />

            {/* Legacy and Focus */}
            <div className="mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
                Legacy and Focus
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-lg leading-relaxed">
                <div className="space-y-6">
                  <p>
                    Five years from now, I see myself as a father, a husband, and a man fully free—financially, spiritually, and mentally.
                    I will create transformational products, build movements, and teach others how to do the same.
                  </p>
                  <p>
                    But more than success, I want to be remembered for character.<br />
                    Because character is who you are when no one's watching.
                  </p>
                  <p>
                    I will not compromise that.
                  </p>
                </div>
                <div className="space-y-6">
                  <p>
                    Everything I do—every word, every business, every move—is built on integrity.
                    As a man, and as a Muslim, my foundation is faith, discipline, and truth.
                  </p>
                  <p>
                    What's God-given can't be taken by man.<br />
                    And as long as I walk in truth, I'll never lose my way.
                  </p>
                  <p className="font-semibold text-xl">
                    This is the rebirth of Malik.<br />
                    And this time,<br />
                    I'm walking in truth.
                  </p>
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="mt-20 pt-12 border-t border-primary/30">
              <div className="text-center space-y-4">
                <p className="font-serif text-2xl font-semibold">
                  – Malik Sali Akbar
                </p>
                <p className="text-muted-foreground text-lg">
                  Founder of Malik's Blog: The Architecture of Freedom
                </p>
                <p className="text-primary italic">
                  "See the world through the eyes of truth."
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
