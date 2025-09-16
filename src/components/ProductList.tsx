// src/components/ProductList.tsx

import React, { useEffect } from 'react';
// Make sure react-redux is imported
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProductsAsync } from '../redux/productSlice';
import ProductCard from './ProductCard';
import { Product } from '../types'; // <-- **Make sure this import is here**

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsAsync());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="text-center text-xl mt-10">Loading products...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center text-xl mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {/*
        THIS IS THE FIX for the second error.
        We explicitly tell TypeScript that 'product' is of type 'Product'.
      */}
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;