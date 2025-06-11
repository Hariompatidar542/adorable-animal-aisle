
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProductImages } from '@/hooks/useProductImages';
import { motion, Reorder } from 'framer-motion';

interface MultipleImageUploadProps {
  productId?: number;
  onChange?: (images: any[]) => void;
  disabled?: boolean;
}

export const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  productId,
  onChange,
  disabled = false
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    images,
    addImage,
    deleteImage,
    updateImageOrder,
    isAdding
  } = useProductImages(productId);

  const handleFileSelect = async (files: File[]) => {
    if (!productId) {
      console.log('No product ID provided for image upload');
      return;
    }

    setIsUploading(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          console.log('Skipping non-image file:', file.name);
          continue;
        }

        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          addImage({
            product_id: productId,
            image_url: result,
            display_order: images.length + i,
            is_primary: images.length === 0 && i === 0
          });
        };
        reader.onerror = () => {
          console.error('Error reading file:', file.name);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Error processing files:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setDragActive(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleReorder = (newImages: any[]) => {
    console.log('Reordering images:', newImages);
    newImages.forEach((image, index) => {
      if (image.display_order !== index) {
        updateImageOrder({
          imageId: image.id,
          displayOrder: index
        });
      }
    });
  };

  const handleDeleteImage = (imageId: string) => {
    console.log('Deleting image:', imageId);
    deleteImage(imageId);
  };

  return (
    <div className="space-y-4">
      <Label>Product Images</Label>
      
      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer transition-colors",
          dragActive && "border-primary bg-primary/10",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        {isUploading || isAdding ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Drop images here or click to upload</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, JPEG (multiple files supported)</p>
            </div>
            <Button type="button" variant="outline" size="sm" disabled={disabled}>
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </div>
        )}
      </div>

      {/* Image Gallery */}
      {images && images.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Uploaded Images (drag to reorder)</Label>
          <Reorder.Group 
            axis="y" 
            values={images} 
            onReorder={handleReorder} 
            className="space-y-2"
          >
            {images.map((image) => (
              <Reorder.Item 
                key={image.id} 
                value={image} 
                className="flex items-center gap-3 p-3 border rounded-md bg-background"
              >
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                <img 
                  src={image.image_url} 
                  alt="Product image" 
                  className="w-16 h-16 object-cover rounded border" 
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Image {image.display_order + 1}</p>
                  {image.is_primary && (
                    <p className="text-xs text-primary">Primary Image</p>
                  )}
                </div>
                <Button 
                  type="button" 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDeleteImage(image.id)}
                  disabled={disabled}
                >
                  <X className="w-4 h-4" />
                </Button>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};
