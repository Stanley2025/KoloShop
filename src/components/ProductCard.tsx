// src/components/ProductCard.tsx

import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    // Added transition-all and duration-300 for smooth effects
    <div className="bg-white border rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col group">
      <div className="relative h-60">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4"
        />
        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full uppercase">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate" title={product.title}>
          {product.title}
        </h2>
        <div className="flex items-center justify-between mt-auto pt-4">
          <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          {/* --- ADDED "ADD TO CART" BUTTON --- */}
          <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;