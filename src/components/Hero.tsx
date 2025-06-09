import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
export const Hero = () => {
  return <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Everything Your
                <span className="text-primary block">Furry Friends</span>
                <span className="text-secondary">Need</span>
              </h1>
              <p className="text-lg max-w-md text-gray-950">
                Discover premium pet products, from nutritious food to fun toys. 
                Because every pet deserves the best care and love.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-primary text-white hover:opacity-90 transition-opacity">
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-2">
                <Heart className="mr-2 w-4 h-4" />
                View Favorites
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t">
              <div>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Pets</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">1000+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-orange-100 p-8">
              <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80" alt="Happy pets" className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-white text-2xl animate-bounce">
              🐕
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl animate-pulse">
              🐱
            </div>
          </div>
        </div>
      </div>
    </section>;
};