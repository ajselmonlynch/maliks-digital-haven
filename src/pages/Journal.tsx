import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const Journal = () => {
  const posts = [
    {
      title: "On Discipline and the Modern Man",
      category: "Mindset",
      date: "March 15, 2025",
      excerpt: "True strength isn't found in comfort — it's forged in the fire of daily discipline, one choice at a time. Every morning you wake up is a chance to become who you're meant to be.",
      readTime: "5 min read"
    },
    {
      title: "The Art of Seeing",
      category: "Reflection",
      date: "March 10, 2025",
      excerpt: "What we see depends entirely on where we stand. Change your position, change your perspective, change your life. The Meta Glasses taught me this truth in ways I never expected.",
      readTime: "7 min read"
    },
    {
      title: "Faith, Not Fear",
      category: "Faith",
      date: "March 5, 2025",
      excerpt: "When the path ahead is unclear, faith becomes your compass. Fear is temporary. Faith is eternal. Choose wisely.",
      readTime: "4 min read"
    },
    {
      title: "The Bruce Wayne Principle",
      category: "Hustle",
      date: "February 28, 2025",
      excerpt: "By day, a composed visionary. By night, an unrelenting force. The duality isn't weakness — it's strategy. Master both sides.",
      readTime: "6 min read"
    },
    {
      title: "On Building Legacy",
      category: "Reflection",
      date: "February 20, 2025",
      excerpt: "Your legacy isn't what you leave behind. It's what you build in others while you're here. Every action, every word, every choice — they all count.",
      readTime: "8 min read"
    },
    {
      title: "Silence as Power",
      category: "Discipline",
      date: "February 12, 2025",
      excerpt: "In a world obsessed with noise, your silence becomes your greatest weapon. Not everything deserves a response. Master the art of strategic silence.",
      readTime: "5 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center">
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                The Journal
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Raw thoughts, unfiltered truth, timeless wisdom
              </p>
            </div>

            <div className="space-y-8">
              {posts.map((post, index) => (
                <Card 
                  key={index}
                  className="bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer group"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="border-primary text-primary">
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    
                    <h2 className="font-serif text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    
                    <div className="text-primary font-medium group-hover:underline">
                      Read full entry →
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Journal;
