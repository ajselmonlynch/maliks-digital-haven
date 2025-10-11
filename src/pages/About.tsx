import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center">
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                Who is Malik?
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                The man behind the lens, the mission behind the art
              </p>
            </div>

            <div className="space-y-12">
              {/* Bruce Wayne Section */}
              <Card className="bg-card border-border">
                <CardContent className="p-8 md:p-12">
                  <div className="mb-6">
                    <h2 className="font-serif text-4xl font-bold mb-2">
                      The Man
                    </h2>
                    <p className="text-primary font-medium">Bruce Wayne</p>
                  </div>
                  
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      By day, I am Malik Sali Akbar — a philosopher, artist, and digital creator. 
                      I walk through the world with Meta Glasses, capturing candid truths and unfiltered 
                      perspectives that others miss.
                    </p>
                    <p>
                      My work is rooted in timeless principles: discipline, faith, and relentless self-improvement. 
                      I believe that every man has the potential to become extraordinary — not through hype, 
                      but through consistent, intentional action.
                    </p>
                    <p>
                      I create art, write journal entries, and share wisdom not for applause, but for legacy. 
                      What I build today will outlive me. What I teach will echo beyond my years.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Batman Section */}
              <Card className="bg-card border-primary border-2">
                <CardContent className="p-8 md:p-12">
                  <div className="mb-6">
                    <h2 className="font-serif text-4xl font-bold mb-2">
                      The Mission
                    </h2>
                    <p className="text-primary font-medium">Batman</p>
                  </div>
                  
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Behind the composed exterior lies an unrelenting force. My mission is simple: 
                      wake people up. Too many are sleepwalking through life, chasing comfort, avoiding truth.
                    </p>
                    <p>
                      I don't sell dreams — I sell discipline. I don't promise easy — I promise transformation. 
                      Through my journal, my art, and my unfiltered perspective, I challenge men to stop waiting 
                      and start building.
                    </p>
                    <p>
                      This platform isn't just a blog. It's a headquarters for modern warriors — men who refuse 
                      to settle, who see through the noise, and who build empires in silence. If you're here, 
                      you already know the truth.
                    </p>
                    <p className="text-foreground font-semibold text-lg pt-4">
                      The question is: What will you do with it?
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Philosophy Section */}
              <div className="text-center py-12">
                <h3 className="font-serif text-3xl font-bold mb-6">
                  Core Philosophy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-primary text-5xl font-bold mb-4">01</div>
                    <h4 className="font-semibold text-xl mb-2">Discipline Over Motivation</h4>
                    <p className="text-muted-foreground">
                      Motivation fades. Discipline stays. Build systems, not excuses.
                    </p>
                  </div>
                  <div>
                    <div className="text-primary text-5xl font-bold mb-4">02</div>
                    <h4 className="font-semibold text-xl mb-2">Raw Truth Over Comfort</h4>
                    <p className="text-muted-foreground">
                      The truth hurts, but it's the only path to real growth.
                    </p>
                  </div>
                  <div>
                    <div className="text-primary text-5xl font-bold mb-4">03</div>
                    <h4 className="font-semibold text-xl mb-2">Legacy Over Applause</h4>
                    <p className="text-muted-foreground">
                      What you build today echoes beyond your lifetime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
