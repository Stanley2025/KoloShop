// src/components/ProductCardSkeleton.tsx

import React from 'react';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-60 bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;