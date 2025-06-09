
import React, { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProducts, Product } from '@/hooks/useProducts';
import { ProductList } from '@/components/admin/ProductList';
import { ProductForm } from '@/components/admin/ProductForm';
import { useAuth } from '@/contexts/AuthContext';
import { Auth } from '@/components/Auth';

type ViewMode = 'list' | 'add' | 'edit';

const Admin = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAuth, setShowAuth] = useState(!user);

  const {
    products,
    isLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    isCreating,
    isUpdating,
  } = useProducts();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
          <p className="text-muted-foreground mb-6">Please sign in to access the admin panel</p>
          <Button onClick={() => setShowAuth(true)}>Sign In</Button>
        </div>
        <Auth isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </div>
    );
  }

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setViewMode('add');
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setViewMode('edit');
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleFormSubmit = (data: any) => {
    if (viewMode === 'edit' && selectedProduct) {
      updateProduct({ id: selectedProduct.id, ...data });
    } else {
      createProduct(data);
    }
    setViewMode('list');
    setSelectedProduct(null);
  };

  const handleFormCancel = () => {
    setViewMode('list');
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your pet products</p>
          </div>
          
          {viewMode === 'list' ? (
            <Button onClick={handleAddProduct} className="gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          ) : (
            <Button variant="outline" onClick={handleFormCancel}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to List
            </Button>
          )}
        </div>

        {viewMode === 'list' ? (
          <ProductList
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            isLoading={isLoading}
          />
        ) : (
          <ProductForm
            product={selectedProduct}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isLoading={isCreating || isUpdating}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
