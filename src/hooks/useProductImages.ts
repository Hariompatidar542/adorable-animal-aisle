
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProductImage {
  id: string;
  product_id: number;
  image_url: string;
  display_order: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImageInput {
  product_id: number;
  image_url: string;
  display_order: number;
  is_primary: boolean;
}

export const useProductImages = (productId?: number) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: images = [], isLoading } = useQuery({
    queryKey: ['product-images', productId],
    queryFn: async () => {
      if (!productId) return [];
      
      console.log('Fetching images for product:', productId);
      
      const { data, error } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', productId)
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching product images:', error);
        throw error;
      }
      
      console.log('Fetched images:', data);
      return data as ProductImage[];
    },
    enabled: !!productId,
  });

  const addImageMutation = useMutation({
    mutationFn: async (imageData: ProductImageInput) => {
      console.log('Adding image:', imageData);
      
      const { data, error } = await supabase
        .from('product_images')
        .insert(imageData)
        .select()
        .single();
      
      if (error) {
        console.error('Error adding image:', error);
        throw error;
      }
      
      console.log('Image added successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-images'] });
      toast({
        title: "Success",
        description: "Image added successfully!",
      });
    },
    onError: (error) => {
      console.error('Error adding image:', error);
      toast({
        title: "Error",
        description: "Failed to add image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (imageId: string) => {
      console.log('Deleting image:', imageId);
      
      const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('id', imageId);
      
      if (error) {
        console.error('Error deleting image:', error);
        throw error;
      }
      
      console.log('Image deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-images'] });
      toast({
        title: "Success",
        description: "Image deleted successfully!",
      });
    },
    onError: (error) => {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateImageOrderMutation = useMutation({
    mutationFn: async ({ imageId, displayOrder }: { imageId: string; displayOrder: number }) => {
      console.log('Updating image order:', { imageId, displayOrder });
      
      const { error } = await supabase
        .from('product_images')
        .update({ display_order: displayOrder })
        .eq('id', imageId);
      
      if (error) {
        console.error('Error updating image order:', error);
        throw error;
      }
      
      console.log('Image order updated successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-images'] });
    },
    onError: (error) => {
      console.error('Error updating image order:', error);
      toast({
        title: "Error",
        description: "Failed to update image order. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    images,
    isLoading,
    addImage: addImageMutation.mutate,
    deleteImage: deleteImageMutation.mutate,
    updateImageOrder: updateImageOrderMutation.mutate,
    isAdding: addImageMutation.isPending,
    isDeleting: deleteImageMutation.isPending,
  };
};
