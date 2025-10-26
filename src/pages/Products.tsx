import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, Download } from "lucide-react";

const Products = () => {
  const products = [
    {
      icon: BookOpen,
      title: "The Architecture of Freedom",
      description: "A comprehensive guide to building mental sovereignty and mastering your mindset.",
      price: "$27",
      formats: ["eBook", "Audiobook", "Hardcover"],
      category: "Digital Book"
    },
    {
      icon: FileText,
      title: "The Daily Architect Journal",
      description: "A premium guided journal for building discipline, clarity, and purposeful daily rituals.",
      price: "$17",
      formats: ["PDF", "Printable"],
      category: "Journal"
    },
    {
      icon: Video,
      title: "Mindset Mastery Course",
      description: "A transformative 8-week video course on developing unshakeable mental discipline.",
      price: "$97",
      formats: ["Video Series", "Workbook"],
      category: "Course"
    },
    {
      icon: BookOpen,
      title: "Truth & Transformation",
      description: "Raw reflections on identity, loss, and the journey to authentic manhood.",
      price: "$24",
      formats: ["eBook", "Audiobook"],
      category: "Digital Book"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-5xl md:text-6xl font-bold animate-fade-in">
              Digital Products
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Wisdom, tools, and experiences designed to transform your mind and elevate your life.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <Card key={index} className="group hover:shadow-glow-gold transition-all duration-300 bg-card border-border">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl font-serif mb-2">{product.title}</CardTitle>
                        <p className="text-sm text-primary font-semibold">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-primary">{product.price}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <CardDescription className="text-base leading-relaxed">
                      {product.description}
                    </CardDescription>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Available formats:</p>
                      <div className="flex flex-wrap gap-2">
                        {product.formats.map((format, i) => (
                          <span key={i} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                            {format}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button 
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-glow-gold"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Purchase
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-20 text-center space-y-4">
            <h2 className="font-serif text-3xl font-bold">More Coming Soon</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              New courses, workshops, and exclusive content are in development. 
              Join the newsletter to be notified when they launch.
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-glow-gold"
            >
              Join the Newsletter
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
