import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-books.jpg";
import { ArrowRight, Star } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string | null;
  price: number;
  cover_image_url: string | null;
}

const Index = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("featured", true)
        .limit(3);

      if (data) {
        setFeaturedBooks(data);
      }
    };

    fetchFeaturedBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Discover Your Next
              <span className="block text-accent">Great Read</span>
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-lg">
              Explore thousands of books across all genres. From timeless classics to modern bestsellers.
            </p>
            <div className="flex gap-4">
              <Link to="/books">
                <Button size="lg" variant="accent" className="group">
                  Browse Collection
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Featured Books</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hand-picked selections from our collection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredBooks.map((book) => (
            <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{book.title}</CardTitle>
                    <CardDescription className="text-base">by {book.author}</CardDescription>
                  </div>
                  <Star className="w-5 h-5 text-accent fill-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {book.description || "An incredible reading experience awaits."}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-2xl font-bold text-accent">${book.price}</span>
                <Link to="/books">
                  <Button variant="accent" size="sm">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/books">
            <Button variant="outline" size="lg">
              View All Books
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
              <p className="text-muted-foreground">
                Every book is carefully selected for quality and reader satisfaction
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Get your books delivered quickly and securely to your doorstep
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Great Prices</h3>
              <p className="text-muted-foreground">
                Competitive pricing on all titles with regular special offers
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
