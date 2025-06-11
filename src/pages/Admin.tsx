import React, { useState } from 'react';
import { Plus, ArrowLeft, Users, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProducts, Product } from '@/hooks/useProducts';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { ProductList } from '@/components/admin/ProductList';
import { ProductForm } from '@/components/admin/ProductForm';
import { AdminAccessManager } from '@/components/admin/AdminAccessManager';
import { useAuth } from '@/contexts/AuthContext';
import { Auth } from '@/components/Auth';
type ViewMode = 'list' | 'add' | 'edit';
const Admin = () => {
  const {
    user
  } = useAuth();
  const {
    isAdmin,
    isCheckingAdmin
  } = useAdminAccess();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAuth, setShowAuth] = useState(!user);
  const [activeTab, setActiveTab] = useState('products');
  const {
    products,
    isLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    isCreating,
    isUpdating
  } = useProducts();

  // Show loading while checking admin status
  if (isCheckingAdmin) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking access permissions...</p>
        </div>
      </div>;
  }

  // Show auth if not logged in
  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
          <p className="text-muted-foreground mb-6">Please sign in to access the admin panel</p>
          <Button onClick={() => setShowAuth(true)}>Sign In</Button>
        </div>
        <Auth isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </div>;
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-red-600">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have admin permissions to access this panel.
          </p>
          <p className="text-sm text-muted-foreground">
            Contact an administrator to request access.
          </p>
        </div>
      </div>;
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
      updateProduct({
        id: selectedProduct.id,
        ...data
      });
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
  return <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 bg-slate-50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your pet products and admin access</p>
          </div>
          
          {viewMode === 'list' ? <Button onClick={handleAddProduct} className="gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button> : <Button variant="outline" onClick={handleFormCancel}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to List
            </Button>}
        </div>

        {viewMode === 'list' ? <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="products" className="flex items-center gap-2 bg-slate-50 text-slate-900">
                <Package className="w-4 h-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="admin-access" className="flex items-center gap-2 bg-slate-100 text-slate-950">
                <Users className="w-4 h-4" />
                Admin Access
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              <ProductList products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} isLoading={isLoading} />
            </TabsContent>
            
            <TabsContent value="admin-access">
              <AdminAccessManager />
            </TabsContent>
          </Tabs> : <ProductForm product={selectedProduct} onSubmit={handleFormSubmit} onCancel={handleFormCancel} isLoading={isCreating || isUpdating} />}
      </div>
    </div>;
};
export default Admin;