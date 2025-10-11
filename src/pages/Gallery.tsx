import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Gallery = () => {
  const artworks = [
    {
      title: "Urban Perspective",
      category: "Through the Lens",
      price: "$45",
    },
    {
      title: "Silent Strength",
      category: "Portraits",
      price: "$65",
    },
    {
      title: "Dawn Discipline",
      category: "Moments",
      price: "$50",
    },
    {
      title: "Raw Truth",
      category: "Through the Lens",
      price: "$55",
    },
    {
      title: "The Visionary",
      category: "Portraits",
      price: "$70",
    },
    {
      title: "Midnight Hustle",
      category: "Moments",
      price: "$60",
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Art & Merch
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every piece tells a story. Every image captures a truth. Own a piece of the vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork, index) => (
              <Card 
                key={index}
                className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary transition-all duration-300"
              >
                <div className="aspect-square bg-gradient-hero relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <span className="font-serif text-6xl opacity-20">{index + 1}</span>
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-primary font-medium mb-2">
                    {artwork.category}
                  </p>
                  <h3 className="font-serif text-2xl font-bold mb-4">
                    {artwork.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      {artwork.price}
                    </span>
                    <Button 
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      Order Print
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              All prints available in multiple sizes. High-quality, museum-grade materials.
            </p>
            <p className="text-sm text-muted-foreground">
              Prints produced and shipped via premium print-on-demand services.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
