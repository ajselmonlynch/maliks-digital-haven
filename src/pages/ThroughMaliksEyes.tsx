import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Play } from "lucide-react";

const ThroughMaliksEyes = () => {
  // Placeholder video data - will be replaced with actual YouTube API integration
  const videos = [
    {
      id: "1",
      title: "Walking Through Boston: Truth in the Streets",
      thumbnail: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
      duration: "12:34",
      description: "Raw perspective from the streets of Boston."
    },
    {
      id: "2",
      title: "Morning Reflections: Building Mental Discipline",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      duration: "8:15",
      description: "Dawn thoughts on consistency and truth."
    },
    {
      id: "3",
      title: "The Rebirth Journey: Loss to Purpose",
      thumbnail: "https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?w=800&q=80",
      duration: "15:42",
      description: "Speaking on transformation and accountability."
    },
    {
      id: "4",
      title: "City Nights: Conversations on Truth",
      thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
      duration: "10:28",
      description: "Late night reflections in the city."
    },
    {
      id: "5",
      title: "Ocean Dawn: Meditation on Freedom",
      thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
      duration: "6:52",
      description: "Sunrise by the water, thoughts on liberty."
    },
    {
      id: "6",
      title: "The Architecture of Daily Discipline",
      thumbnail: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=800&q=80",
      duration: "11:19",
      description: "Breaking down the daily rituals that build greatness."
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
            <div className="flex items-center justify-center gap-3 mb-4">
              <Eye className="w-12 h-12 text-primary" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold animate-fade-in">
              Through Malik's Eyes
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Point-of-view documentary content capturing raw truth, daily discipline, 
              and unfiltered perspectives from the streets to the soul.
            </p>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <Card 
                key={video.id} 
                className="group cursor-pointer hover:shadow-glow-gold transition-all duration-300 bg-card border-border overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white font-semibold">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {video.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Channel CTA */}
          <div className="mt-20 text-center space-y-6">
            <h2 className="font-serif text-3xl font-bold">Subscribe for More</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              New POV content every week. Follow the journey from the streets of Boston 
              to the architecture of freedom.
            </p>
            <a 
              href="https://youtube.com/@EmpireArchitect" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-md shadow-glow-gold transition-all">
                Watch on YouTube
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThroughMaliksEyes;
