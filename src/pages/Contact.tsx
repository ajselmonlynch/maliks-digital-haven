import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Twitter, Youtube } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center">
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                Connect
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join the conversation. Share your thoughts. Build together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-bold mb-6">Get in Touch</h2>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input 
                        id="name"
                        placeholder="Your name"
                        className="bg-secondary border-border"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="bg-secondary border-border"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea 
                        id="message"
                        placeholder="What's on your mind?"
                        rows={6}
                        className="bg-secondary border-border resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card className="bg-card border-border">
                  <CardContent className="p-8">
                    <h3 className="font-serif text-2xl font-bold mb-4">
                      Join the Newsletter
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Weekly wisdom, art drops, and exclusive insights delivered straight to your inbox.
                    </p>
                    <div className="space-y-4">
                      <Input 
                        type="email"
                        placeholder="Enter your email"
                        className="bg-secondary border-border"
                      />
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Mail className="mr-2" size={18} />
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-8">
                    <h3 className="font-serif text-2xl font-bold mb-4">
                      Follow the Journey
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Daily updates, behind-the-scenes content, and real-time perspectives.
                    </p>
                    <div className="space-y-3">
                      <a 
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all group"
                      >
                        <Twitter size={20} />
                        <span className="font-medium">Follow on X (Twitter)</span>
                      </a>
                      <a 
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all group"
                      >
                        <Youtube size={20} />
                        <span className="font-medium">Subscribe on YouTube</span>
                      </a>
                      <a 
                        href="https://fanbase.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all group"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          F
                        </div>
                        <span className="font-medium">Join on Fanbase</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
