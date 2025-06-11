
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
  const {
    products,
    isLoading
  } = useProducts();

  const filteredProducts = activeCategory === 'All' ? products : products.filter(product => product.category === activeCategory);
  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  if (isLoading) {
    return <section className="py-12 md:py-20 bg-gradient-to-b from-white to-purple-50 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
              Featured <span className="text-purple-600">Products</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed px-4">
              Discover our carefully curated selection of premium pet products, 
              designed to keep your furry friends happy and healthy.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[...Array(6)].map((_, i) => <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-3xl"></div>
                <div className="p-4 md:p-6 bg-white rounded-b-3xl modern-shadow">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-12 bg-gray-200 rounded-2xl"></div>
                </div>
              </div>)}
          </div>
        </div>
      </section>;
  }

  return <section className="py-12 md:py-20 bg-gradient-to-b from-white to-purple-50 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-purple-700 mb-4">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            Premium Collection
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 px-4">
            Featured <span className="text-purple-600">Products</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed px-4">
            Discover our carefully curated selection of premium pet products, 
            designed to keep your furry friends happy and healthy.
          </p>
        </div>

        {/* Enhanced Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-16 px-4">
          {categories.map(category => <Button key={category} variant={activeCategory === category ? "default" : "outline"} onClick={() => {
          setActiveCategory(category);
          setVisibleProducts(6);
        }} className="text-gray-800 py-2 text-sm md:text-base px-4 md:px-8 rounded-md font-medium bg-white hover:bg-gray-50 border border-gray-200 flex-shrink-0">
              {category}
            </Button>)}
        </div>

        {/* Enhanced Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
          {displayedProducts.map((product, index) => <ProductCard key={product.id} product={{
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.original_price || undefined,
          image: product.image || '/placeholder.svg',
          rating: product.rating || 0,
          reviews: product.reviews || 0
        }} onClick={() => onProductClick(product)} className="animate-fade-in" style={{
          animationDelay: `${index * 100}ms`
        }} />)}
        </div>

        {/* Enhanced Load More Button */}
        {visibleProducts < filteredProducts.length && <div className="text-center px-4">
            <Button variant="outline" size="lg" onClick={() => setVisibleProducts(prev => prev + 6)} className="border-purple-200 hover:border-purple-300 rounded-full px-6 md:px-8 py-3 font-medium transition-all duration-300 shadow-lg hover:shadow-xl bg-white hover:bg-gray-50 text-gray-800 w-full sm:w-auto">
              Load More Products
            </Button>
          </div>}
      </div>
    </section>;
};
