
-- Create a table to store multiple images for each product
CREATE TABLE public.product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for better performance
CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX idx_product_images_display_order ON public.product_images(product_id, display_order);

-- Enable RLS (Row Level Security)
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to allow public read access for product images
CREATE POLICY "Anyone can view product images" ON public.product_images
  FOR SELECT USING (true);

-- Create RLS policy to allow authenticated users to manage product images (for admin functionality)
CREATE POLICY "Authenticated users can manage product images" ON public.product_images
  FOR ALL USING (auth.role() = 'authenticated');

-- Add trigger for updated_at
CREATE TRIGGER update_product_images_updated_at
  BEFORE UPDATE ON public.product_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
