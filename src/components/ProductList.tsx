// src/components/ProductList.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
// --- IMPORT THE NEW SELECTOR ---
import { fetchProductsAsync, selectPaginatedProducts } from '../redux/productSlice';
import ProductCard from './ProductCard';
import { Product } from '../types';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // --- UPDATE THIS LINE TO USE THE NEW SELECTOR ---
  const { products, totalItems } = useSelector(selectPaginatedProducts);
  const { status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsAsync());
    }
  }, [status, dispatch]);
  
  // ... (loading and error states are the same) ...

  if (products.length === 0 && status === 'succeeded') {
    return <div className="text-center text-xl mt-10">No products found.</div>;
  }

  // The ProductList component itself does not need to change much.
  // It just renders the products it receives from the selector.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;