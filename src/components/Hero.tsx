import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Sparkles, Star } from 'lucide-react';
export const Hero = () => {
  return <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blob-shape animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-20 blob-shape animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blob-shape"></div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-purple-700 border border-purple-200">
                <Sparkles className="w-4 h-4" />
                Premium Pet Care Products
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Everything Your
                <span className="text-gradient block">Furry Friends</span>
                <span className="text-orange-500">Deserve</span>
              </h1>
              
              <p className="text-xl max-w-lg text-gray-600 leading-relaxed">
                Discover premium pet products crafted with love. From nutritious treats to cozy beds, 
                we have everything to keep your pets happy and healthy.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl group text-slate-900">
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 group">
                <Heart className="mr-2 w-4 h-4 group-hover:text-pink-500 transition-colors" />
                View Favorites
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="flex gap-8 pt-8">
              <div className="glass-card p-4 rounded-2xl">
                <div className="text-3xl font-bold text-purple-600 flex items-center gap-2">
                  50K+
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                </div>
                <div className="text-sm text-gray-600 font-medium">Happy Pets</div>
              </div>
              <div className="glass-card p-4 rounded-2xl">
                <div className="text-3xl font-bold text-orange-500">1000+</div>
                <div className="text-sm text-gray-600 font-medium">Products</div>
              </div>
              <div className="glass-card p-4 rounded-2xl">
                <div className="text-3xl font-bold text-pink-500">24/7</div>
                <div className="text-sm text-gray-600 font-medium">Support</div>
              </div>
            </div>
          </div>

          {/* Enhanced Hero Image */}
          <div className="relative">
            <div className="relative">
              {/* Main image container */}
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-8 modern-shadow">
                <img alt="Happy pets" src="/lovable-uploads/f6b74500-6eec-4bc8-a25d-2db13eb5803e.png" className="w-full h-full rounded-2xl floating-element object-fill" />
              </div>
              
              {/* Floating elements with modern styling */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl animate-bounce shadow-lg glow-effect">
                🐕
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl animate-pulse shadow-lg glow-effect">
                🐱
              </div>
              <div className="absolute top-1/2 -right-8 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl animate-ping shadow-lg">
                🐦
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};