
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ImageViewer } from '@/components/ui/image-viewer';

interface ImageCarouselProps {
  images: string[];
  className?: string;
  autoPlay?: boolean;
  showControls?: boolean;
  showDots?: boolean;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  className,
  autoPlay = true,
  showControls = true,
  showDots = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleImageClick = () => {
    setViewerIndex(currentIndex);
    setIsViewerOpen(true);
  };

  const handleViewerPrevious = () => {
    setViewerIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleViewerNext = () => {
    setViewerIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className={cn("w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center", className)}>
        <span className="text-gray-500">No images</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <>
        <div className={cn("relative overflow-hidden rounded-lg cursor-pointer", className)} onClick={handleImageClick}>
          <img
            src={images[0]}
            alt="Product"
            className="w-full h-48 object-cover"
          />
        </div>
        <ImageViewer
          images={images}
          currentIndex={0}
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          onPrevious={handleViewerPrevious}
          onNext={handleViewerNext}
        />
      </>
    );
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <>
      <div className={cn("relative overflow-hidden rounded-lg group", className)}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Product image ${currentIndex + 1}`}
            className="w-full h-48 object-cover cursor-pointer"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            onClick={handleImageClick}
          />
        </AnimatePresence>

        {/* Controls */}
        {showControls && images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40 text-white"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40 text-white"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* Dots */}
        {showDots && images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex
                    ? "bg-white scale-110"
                    : "bg-white/50 hover:bg-white/75"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <ImageViewer
        images={images}
        currentIndex={viewerIndex}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        onPrevious={handleViewerPrevious}
        onNext={handleViewerNext}
      />
    </>
  );
};
