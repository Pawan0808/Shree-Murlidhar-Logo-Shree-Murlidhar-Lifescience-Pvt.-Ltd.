import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product-types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  return (
    <div className={`healthcare-card p-6 group ${className}`}>
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square rounded-lg bg-muted mb-4 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="space-y-3">
          <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-2">
            {product.name}
          </h3>
          {product.category && (
            <Badge variant="outline" className="text-sm">
              {product.category}
            </Badge>
          )}
          {product.price && (
            <p className="text-lg font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </p>
          )}
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
