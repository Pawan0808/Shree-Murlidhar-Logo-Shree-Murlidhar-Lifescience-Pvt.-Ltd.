import React from 'react';
import { ExternalLink, Play, Heart, MessageCircle, Instagram } from 'lucide-react';

// Minimal type to render feed cards
export type InstagramMedia = {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp?: string;
};

const CARD_COUNT = 6;

export default function InstagramFeed() {
  const [items, setItems] = React.useState<InstagramMedia[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  const apiUrl = (import.meta as any).env?.VITE_INSTAGRAM_API_URL || '/api/instagram';

  React.useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(apiUrl, { headers: { 'accept': 'application/json' } });
        if (!res.ok) throw new Error(`Feed request failed: ${res.status}`);
        const data = await res.json();
        const list: InstagramMedia[] = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
        if (active) setItems(list.slice(0, CARD_COUNT));
      } catch (e: any) {
        if (active) setError(e?.message || 'Failed to load Instagram feed');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [apiUrl]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4">
            <Instagram className="w-6 h-6 text-white" />
          </div>
          <div className="h-8 bg-muted rounded-lg w-48 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-64 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: CARD_COUNT }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square rounded-2xl bg-muted mb-3"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Instagram className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Unable to Load Feed</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {error}
        </p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-50 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Instagram className="w-8 h-8 text-pink-500" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Posts Yet</h3>
        <p className="text-muted-foreground">Check back later for updates.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <Instagram className="w-7 h-7 text-white" />
        </div>
        <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-3">
          Follow Us on Instagram
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Stay updated with our latest products, behind-the-scenes, and wellness tips
        </p>
      </div>

      {/* Instagram Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((post, index) => (
          <div
            key={post.id}
            className="group relative bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50 hover:border-border/80"
          >
            {/* Image/Video Container */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url}
                alt={post.caption || 'Instagram post'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex space-x-4">
                  {post.media_type === 'VIDEO' && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <Play className="w-5 h-5 text-black" fill="black" />
                    </div>
                  )}
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <ExternalLink className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>

              {/* Media Type Badge */}
              {post.media_type === 'VIDEO' && (
                <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Play className="w-3 h-3" fill="white" />
                  <span>Video</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              {post.caption && (
                <p className="text-foreground line-clamp-2 text-sm leading-relaxed mb-3">
                  {post.caption}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">Like</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">Comment</span>
                  </div>
                </div>
                
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View Post</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-pink-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-pink-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Follow CTA */}
      <div className="text-center mt-12">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-gradient-to-br from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Instagram className="w-5 h-5" />
          <span>Follow @OurInstagram</span>
        </a>
      </div>
    </div>
  );
}