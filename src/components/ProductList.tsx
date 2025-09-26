// src/components/ProductList.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProductsAsync, selectPaginatedProducts } from '../redux/productSlice';
import ProductCard from './ProductCard';
import { Product } from '../types';
import ProductCardSkeleton from './ProductCardSkeleton'; // <-- IMPORT

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector(selectPaginatedProducts);
  const { status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsAsync());
    }
  }, [status, dispatch]);

  // --- THIS IS THE UPDATED PART ---
  if (status === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {/* Create an array of 8 items to map over for the skeletons */}
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="text-center text-xl mt-10 text-red-500">{error}</div>;
  }
  
  // ... (rest of the component is the same) ...
  if (products.length === 0 && status === 'succeeded') { /* ... */ }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;