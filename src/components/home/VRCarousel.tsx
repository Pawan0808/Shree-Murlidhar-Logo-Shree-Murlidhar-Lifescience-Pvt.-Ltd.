import { useEffect, useState, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { MediaItem, getMediaItems } from "../../lib/mediaGalleryFirebase";
import "./VRCarousel.css";

const VRCarousel = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [effectiveCardsPerPage, setEffectiveCardsPerPage] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(4);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);

  const desktopCardsPerPage = 4;
  const mobileCardsPerPage = 1;

  // Fetch media items
  useEffect(() => {
    const unsubscribe = getMediaItems(
      (items) => {
        setMediaItems(items);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading media items:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setEffectiveCardsPerPage(mobileCardsPerPage);
      } else {
        setEffectiveCardsPerPage(desktopCardsPerPage);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gradients = [
    "linear-gradient(135deg, #FF1B6B 0%, #45CAFF 100%)",
    "linear-gradient(135deg, #FF6B00 0%, #FF1744 100%)",
    "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
    "linear-gradient(135deg, #E5E7EB 0%, #F3F4F6 100%)",
    "linear-gradient(135deg, #FF1B6B 0%, #FF6B9D 100%)",
    "linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)",
    "linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)",
    "linear-gradient(135deg, #FDBB2D 0%, #22C1C3 100%)"
  ];

  const originalCards = mediaItems.map((item, index) => ({
    id: item.id,
    gradient: gradients[index % gradients.length],
    image: item.url,
    title: item.title,
    description: item.description
  }));

  const numClones = effectiveCardsPerPage;
  const infiniteCards =
    originalCards.length > 0
      ? [
          ...originalCards.slice(-numClones),
          ...originalCards,
          ...originalCards.slice(0, numClones)
        ]
      : [];

  const handleTransitionEnd = useCallback(() => {
    if (infiniteCards.length === 0) return;

    if (currentIndex >= infiniteCards.length - numClones) {
      setTransitionEnabled(false);
      setCurrentIndex(numClones);
    } else if (currentIndex < numClones) {
      setTransitionEnabled(false);
      setCurrentIndex(infiniteCards.length - numClones * 2);
    }
  }, [currentIndex, infiniteCards.length, numClones]);

  useEffect(() => {
    if (!transitionEnabled) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [transitionEnabled]);

  // Auto-slide
  useEffect(() => {
    if (originalCards.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [originalCards.length]);

  // Update transform
  useEffect(() => {
    if (carouselWrapperRef.current && infiniteCards.length > 0) {
      carouselWrapperRef.current.style.transform = `translateX(-${
        currentIndex * (100 / infiniteCards.length)
      }%)`;
      carouselWrapperRef.current.style.transition = transitionEnabled
        ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        : "none";
    }
  }, [currentIndex, transitionEnabled, infiniteCards.length]);

  // Handle escape key for full screen
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && fullScreenImage) {
        setFullScreenImage(null);
      }
    };

    if (fullScreenImage) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [fullScreenImage]);

  const handleImageClick = (imageUrl: string) => {
    setFullScreenImage(imageUrl);
  };

  const handleCloseFullScreen = () => {
    setFullScreenImage(null);
  };

  if (loading) {
    return (
      <div className="vr-carousel-section">
        <h2 className="vr-carousel-heading">Media Gallery</h2>
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (originalCards.length === 0) {
    return (
      <div className="vr-carousel-section">
        <h2 className="vr-carousel-heading">Media Gallery</h2>
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📷</span>
          </div>
          <h3 className="font-semibold text-xl text-foreground mb-2">
            No Images Available
          </h3>
          <p className="text-muted-foreground">
            Images will appear here once added to the gallery.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="vr-carousel-section">
      <h2 className="vr-carousel-heading">Media Gallery</h2>

      <div className="vr-carousel-container">
        <div
          className="vr-carousel-wrapper"
          ref={carouselWrapperRef}
          onTransitionEnd={handleTransitionEnd}
          style={{
            width: `${infiniteCards.length * (100 / effectiveCardsPerPage)}%`
          }}
        >
          {infiniteCards.map((card, index) => (
            <MediaCard
              key={`${card.id}-${index}`}
              card={card}
              style={{ width: `${100 / infiniteCards.length}%` }}
              onImageClick={handleImageClick}
            />
          ))}
        </div>
      </div>

      {/* Full Screen Modal */}
      {fullScreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleCloseFullScreen}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={fullScreenImage}
              alt="Full screen view"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={handleCloseFullScreen}
              className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
              aria-label="Close full screen"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Clean MediaCard (no icon overlay)
interface MediaCardProps {
  card: {
    id: string;
    gradient: string;
    image: string;
    title?: string;
    description?: string;
  };
  style: React.CSSProperties;
  onImageClick: (url: string) => void;
}

const MediaCard = ({ card, style, onImageClick }: MediaCardProps) => {
  const handleImageClick = () => {
    onImageClick(card.image);
  };

  return (
    <div className="vr-card" style={style} onClick={handleImageClick}>
      <div className="vr-card-background" style={{ background: card.gradient }}>
        <img
          src={card.image}
          alt={card.title || `Image ${card.id}`}
          className="vr-card-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://via.placeholder.com/600x800/f3f4f6/9ca3af?text=Image+Not+Found";
          }}
        />
      </div>
    </div>
  );
};

export default VRCarousel;
