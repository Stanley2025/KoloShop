// src/components/ProductCard.tsx

import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
      <div className="relative h-60">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4"
        />
        <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate" title={product.title}>
          {product.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4 flex-grow">
          {product.description.substring(0, 100)}...
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <span className="text-yellow-500 font-bold">
            &#9733; {product.rating.rate} ({product.rating.count} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;