import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../data/products';
interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  stockVariant?: 'simple' | 'quantity';
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showActions = false,
  stockVariant = 'simple',
  compact = false
}) => {
  const stockText = stockVariant === 'quantity'
    ? (product.inStock ? `${product.stockQuantity} in stock` : 'Out of Stock')
    : (product.inStock ? 'In Stock' : 'Out of Stock');
  const contentClass = compact
    ? 'h-[118px]'
    : showActions
      ? 'min-h-[186px]'
      : 'h-[140px]';

  return (
    <article className="h-full rounded-[20px] border border-slate-200 bg-slate-100 p-3 transition hover:shadow-lg">
      <div className="relative mb-3 rounded-2xl bg-white">
        <button
          type="button"
          aria-label="Favorite product"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-gray-700"
        >
          <Heart className="h-4 w-4" />
        </button>
        <Link to={`/product/${product.id}`} className="block">
          <div className={`${compact ? 'h-44' : 'h-56'} overflow-hidden rounded-xl bg-slate-100`}>
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition hover:scale-105"
            />
          </div>
        </Link>
      </div>

      <div className={`flex flex-col rounded-2xl bg-white p-4 ${contentClass}`}>
        <div className="mb-2 flex items-start justify-between gap-2">
          <span className="text-xs font-semibold text-indigo-500">{product.category}</span>
          {product.prescriptionRequired && (
            <span className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-700">Rx</span>
          )}
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="mb-2 line-clamp-1 h-6 font-semibold text-gray-900">{product.name}</h3>
        </Link>

        <div className="mt-auto mb-3 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-500">${product.price}</span>
          <span className={`rounded px-2 py-1 text-xs ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {stockText}
          </span>
        </div>

        {showActions && (
          <div className="flex gap-2">
            <Link
              to={`/product/${product.id}`}
              className="flex-1 rounded-lg border border-black px-4 py-2 text-center text-black hover:bg-black hover:text-white"
            >
              Details
            </Link>
            <button
              type="button"
              disabled
              className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
