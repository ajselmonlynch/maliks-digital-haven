import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Image as ImageIcon, Video } from "lucide-react";

const FeaturedSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "Latest Journal Entry",
      description: "On Discipline and the Modern Man",
      excerpt: "True strength isn't found in comfort — it's forged in the fire of daily discipline, one choice at a time.",
      link: "/journal",
      linkText: "Read More"
    },
    {
      icon: ImageIcon,
      title: "Featured Artwork",
      description: "Through the Lens Series",
      excerpt: "Candid moments captured through Meta Glasses — life unfiltered, raw, and real.",
      link: "/gallery",
      linkText: "View Gallery"
    },
    {
      icon: Video,
      title: "Through Malik's Eyes",
      description: "Latest POV Content",
      excerpt: "Experience the world from my perspective. New episodes every week on YouTube.",
      link: "#videos",
      linkText: "Watch Now"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Latest from Malik
          </h2>
          <p className="text-muted-foreground text-lg">
            Fresh perspectives, timeless wisdom
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-card border-border hover:border-primary transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <feature.icon 
                  className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" 
                />
                <h3 className="font-serif text-2xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-primary text-sm font-medium mb-4">
                  {feature.description}
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.excerpt}
                </p>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full"
                  asChild
                >
                  <a href={feature.link}>{feature.linkText}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
