
import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { Sparkles } from 'lucide-react';

const categories = ['All', 'Dogs', 'Cats', 'Birds', 'Fish'];

interface ProductGridProps {
  onProductClick: (product: any) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  onProductClick
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleProducts, setVisibleProducts] = useState(6);
  
  const { products, isLoading } = useProducts();

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Featured <span className="text-gradient">Products</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
              Discover our carefully curated selection of premium pet products, 
              designed to keep your furry friends happy and healthy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-3xl"></div>
                <div className="p-6 bg-white rounded-b-3xl modern-shadow">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-12 bg-gray-200 rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 text-sm font-medium text-purple-700 mb-4">
            <Sparkles className="w-4 h-4" />
            Premium Collection
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Products</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
            Discover our carefully curated selection of premium pet products, 
            designed to keep your furry friends happy and healthy.
          </p>
        </div>

        {/* Enhanced Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => {
                setActiveCategory(category);
                setVisibleProducts(6);
              }}
              className={`${
                activeCategory === category 
                  ? 'gradient-primary text-white shadow-lg' 
                  : 'border-purple-200 hover:border-purple-300 hover:bg-purple-50'
              } transition-all duration-300 rounded-full px-6 py-2 font-medium`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Enhanced Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.original_price || undefined,
                image: product.image || '/placeholder.svg',
                rating: product.rating || 0,
                reviews: product.reviews || 0,
              }}
              onClick={() => onProductClick(product)}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            />
          ))}
        </div>

        {/* Enhanced Load More Button */}
        {visibleProducts < filteredProducts.length && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleProducts(prev => prev + 6)}
              className="border-purple-200 hover:border-purple-300 hover:bg-purple-50 rounded-full px-8 py-3 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
