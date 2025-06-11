
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrevious();
    if (e.key === 'ArrowRight') onNext();
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
                disabled={currentIndex === images.length - 1}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Main Image */}
          <motion.img
            key={currentIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={images[currentIndex]}
            alt={`Product image ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
