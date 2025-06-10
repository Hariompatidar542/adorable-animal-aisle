import React from 'react';
import { Edit, Trash2, Star, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/hooks/useProducts';
interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}
export const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => <Card key={i} className="animate-pulse">
            <div className="h-48 bg-muted"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded mb-4"></div>
              <div className="flex gap-2">
                <div className="h-8 bg-muted rounded flex-1"></div>
                <div className="h-8 bg-muted rounded flex-1"></div>
              </div>
            </CardContent>
          </Card>)}
      </div>;
  }
  if (products.length === 0) {
    return <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">Start by adding your first product.</p>
      </div>;
  }
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-slate-300">
          <div className="relative">
            <img src={product.image || '/placeholder.svg'} alt={product.name} className="w-full h-48 object-cover" />
            <div className="absolute top-2 right-2 flex gap-1">
              {product.featured && <Badge className="bg-yellow-500 hover:bg-yellow-600">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>}
              {!product.in_stock && <Badge variant="destructive">Out of Stock</Badge>}
            </div>
          </div>

          <CardContent className="p-4 bg-slate-300">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
              <Badge variant="outline">{product.category}</Badge>
            </div>

            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-primary">${product.price}</span>
                {product.original_price && <span className="text-sm text-muted-foreground line-through">
                    ${product.original_price}
                  </span>}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{product.rating || 0}</span>
                <span className="text-sm text-muted-foreground">({product.reviews || 0})</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                Stock: {product.stock_quantity || 0}
              </span>
              <span className={`text-sm ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
                {product.in_stock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(product)} className="flex-1 bg-slate-50">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(product.id)} className="flex-1">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>)}
    </div>;
};