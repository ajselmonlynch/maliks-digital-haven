import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { useState } from "react";

const Library = () => {
  const [selectedUpsells, setSelectedUpsells] = useState<Record<string, string[]>>({});

  const calculateTotal = (bookId: string, basePrice: number, upsells: { id: string; price: number }[]) => {
    const selected = selectedUpsells[bookId] || [];
    const upsellTotal = upsells
      .filter(u => selected.includes(u.id))
      .reduce((sum, u) => sum + u.price, 0);
    return basePrice + upsellTotal;
  };

  const toggleUpsell = (bookId: string, upsellId: string) => {
    setSelectedUpsells(prev => {
      const current = prev[bookId] || [];
      const updated = current.includes(upsellId)
        ? current.filter(id => id !== upsellId)
        : [...current, upsellId];
      return { ...prev, [bookId]: updated };
    });
  };

  const malikBooks = [
    {
      id: "book1",
      title: "The Architecture of Freedom",
      description: "A manifesto on building wealth, character, and legacy through truth and discipline.",
      basePrice: 17,
      upsells: [
        { id: "audiobook", label: "Add Audiobook", price: 17 },
        { id: "hardcover", label: "Add Hardcover", price: 37 },
        { id: "signed", label: "Add Autographed Copy", price: 200 }
      ],
      bundlePrice: 67,
      bundleSavings: 24
    }
  ];

  const readingList = [
    {
      title: "Caste",
      author: "Isabel Wilkerson",
      reflection: "A lens that changed how I see hierarchy, power, and human behavior.",
      link: "#"
    },
    {
      title: "PowerNomics",
      author: "Claud Anderson",
      reflection: "The blueprint for economic freedom and collective power.",
      link: "#"
    },
    {
      title: "Black Labor, White Wealth",
      author: "Claud Anderson",
      reflection: "Understanding the roots of wealth inequality in America.",
      link: "#"
    },
    {
      title: "The Autobiography of Malcolm X",
      author: "Malcolm X",
      reflection: "The story of transformation, truth, and unwavering conviction.",
      link: "#"
    },
    {
      title: "The Souls of Black Folk",
      author: "W.E.B. Du Bois",
      reflection: "A timeless exploration of identity, consciousness, and double consciousness.",
      link: "#"
    },
    {
      title: "Revolutionary Suicide",
      author: "Huey P. Newton",
      reflection: "The courage to stand for something greater than yourself.",
      link: "#"
    }
  ];

  const artMerch = [
    {
      title: "Truth Seeker Tee",
      category: "Apparel",
      price: "$35"
    },
    {
      title: "Freedom Architect Crewneck",
      category: "Apparel",
      price: "$65"
    },
    {
      title: "Vision Tote Bag",
      category: "Accessories",
      price: "$25"
    },
    {
      title: "Legacy Canvas Print",
      category: "Art",
      price: "$89"
    },
    {
      title: "Discipline Snapback",
      category: "Accessories",
      price: "$32"
    },
    {
      title: "Rebirth Hoodie",
      category: "Apparel",
      price: "$75"
    }
  ];

  const bundles = [
    {
      title: "The Daily Architect Kit",
      items: "Journal + Pen + Pencil + Art Book",
      price: "$89",
      description: "Everything you need to design your days with intention."
    },
    {
      title: "The Visionary Set",
      items: "Journal + Scented Candle + Incense + Tote Bag",
      price: "$127",
      description: "Curated essentials for the modern creator."
    },
    {
      title: "The Wealth & Wisdom Vault",
      items: "3 Books + Journal + Autograph + Art Print",
      price: "$297",
      description: "The complete Malik experience — signed and sealed."
    }
  ];

  const ritualEssentials = [
    {
      title: "Walnut Cigar Humidor",
      description: "Ground your focus. Calm your breath.",
      price: "$145"
    },
    {
      title: "Frankincense Oil",
      description: "Ancient wisdom in every drop.",
      price: "$28"
    },
    {
      title: "Meditation Singing Bowl",
      description: "Sound that centers the soul.",
      price: "$67"
    },
    {
      title: "Oud Incense Set",
      description: "Sacred smoke for sacred space.",
      price: "$42"
    },
    {
      title: "Black & Gold Candle",
      description: "Luxury light for focused nights.",
      price: "$38"
    },
    {
      title: "Sandalwood Mala Beads",
      description: "108 steps to inner peace.",
      price: "$54"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Malik's Books */}
      <section className="pt-24 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-foreground">
              Malik's Library
            </h1>
            <p className="text-2xl text-muted-foreground font-serif italic">
              Own the Wisdom. Live the Freedom.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {malikBooks.map((book) => {
              const total = calculateTotal(book.id, book.basePrice, book.upsells);
              const selected = selectedUpsells[book.id] || [];
              
              return (
                <Card key={book.id} className="bg-card border-border p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Book Mockup */}
                    <div className="aspect-[3/4] bg-gradient-gold rounded-lg flex items-center justify-center">
                      <span className="font-serif text-8xl text-primary/20">📖</span>
                    </div>

                    {/* Book Info */}
                    <div>
                      <h2 className="font-serif text-4xl font-bold mb-4">{book.title}</h2>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {book.description}
                      </p>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between text-lg">
                          <span className="text-muted-foreground">eBook (Base)</span>
                          <span className="font-bold">${book.basePrice}</span>
                        </div>

                        {/* Upsells */}
                        <div className="space-y-3 border-t border-border pt-4">
                          {book.upsells.map((upsell) => (
                            <div key={upsell.id} className="flex items-center justify-between">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <Checkbox
                                  checked={selected.includes(upsell.id)}
                                  onCheckedChange={() => toggleUpsell(book.id, upsell.id)}
                                />
                                <span className="text-muted-foreground">{upsell.label}</span>
                              </label>
                              <span className="font-semibold">+${upsell.price}</span>
                            </div>
                          ))}
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between text-2xl font-bold border-t border-border pt-4">
                          <span>Total</span>
                          <span className="text-primary">${total}</span>
                        </div>
                      </div>

                      <Button className="w-full mb-4" size="lg">
                        <ShoppingCart className="mr-2" size={20} />
                        Add to Cart
                      </Button>

                      <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-sm font-medium mb-2">🔥 Complete Experience Bundle</p>
                        <p className="text-xs text-muted-foreground">
                          All 3 Formats for ${book.bundlePrice} (Save ${book.bundleSavings})
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reading List */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              The Books That Built My Mind
            </h2>
            <p className="text-xl text-muted-foreground">
              My curated reading list — the foundation of everything I know.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {readingList.map((book, index) => (
              <Card key={index} className="bg-card border-border p-6 hover:border-primary transition-all duration-300">
                <div className="aspect-[2/3] bg-gradient-hero rounded-md mb-4 flex items-center justify-center">
                  <span className="font-serif text-6xl opacity-20">{index + 1}</span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">{book.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">by {book.author}</p>
                <p className="text-sm italic text-muted-foreground mb-6 leading-relaxed">
                  "{book.reflection}"
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href={book.link} target="_blank" rel="noopener noreferrer">
                    Get It on Amazon
                    <ExternalLink className="ml-2" size={16} />
                  </a>
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="secondary" size="lg">View Full Archive</Button>
          </div>
        </div>
      </section>

      {/* Art & Merch */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Malik's Studio: Art You Can Wear
            </h2>
            <p className="text-xl text-muted-foreground">
              Original designs for those who stand in truth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {artMerch.map((item, index) => (
              <Card key={index} className="bg-background border-border overflow-hidden group hover:border-primary transition-all duration-300">
                <div className="aspect-square bg-gradient-hero relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-7xl opacity-20">🎨</span>
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-primary font-medium mb-2">{item.category}</p>
                  <h3 className="font-serif text-xl font-bold mb-4">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{item.price}</span>
                    <Button size="sm">
                      <ShoppingCart size={16} className="mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Customize Your Look →
            </Button>
          </div>
        </div>
      </section>

      {/* Signature Bundles */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              The Creator's Collection
            </h2>
            <p className="text-xl text-muted-foreground">
              Limited Edition Bundles — Curated with Intention
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {bundles.map((bundle, index) => (
              <Card key={index} className="bg-card border-border p-8 hover:border-primary transition-all duration-300">
                <div className="aspect-square bg-gradient-gold rounded-lg mb-6 flex items-center justify-center">
                  <span className="font-serif text-8xl text-primary/20">📦</span>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">{bundle.title}</h3>
                <p className="text-sm text-primary font-medium mb-4">{bundle.items}</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {bundle.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold">{bundle.price}</span>
                </div>
                <Button className="w-full mb-3">
                  <ShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </Button>
                <Button variant="outline" className="w-full text-xs">
                  + Add Signed Copy (+$200)
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ritual Essentials */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Rituals for Focus & Peace
            </h2>
            <p className="text-xl text-muted-foreground">
              Tools to ground your mind and elevate your space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ritualEssentials.map((item, index) => (
              <Card key={index} className="bg-background border-border p-6 hover:border-primary transition-all duration-300">
                <div className="aspect-square bg-gradient-hero rounded-lg mb-6 flex items-center justify-center">
                  <span className="font-serif text-7xl opacity-20">🕯️</span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm italic text-muted-foreground mb-6">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{item.price}</span>
                  <Button size="sm">
                    <ShoppingCart size={16} className="mr-2" />
                    Add
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Build Your Mind. Master Your Space.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Every book, every product, every bundle — curated to help you think deeper, 
            create better, and live with intention. This is the architecture of freedom.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <ShoppingCart className="mr-2" size={20} />
            Start Shopping
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Library;
