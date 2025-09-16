// src/components/ProductList.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
// --- IMPORT THE NEW SELECTOR AND ACTION ---
import { fetchProductsAsync, selectFilteredProducts } from '../redux/productSlice';
import ProductCard from './ProductCard';
import { Product } from '../types';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // --- UPDATE THIS LINE TO USE THE NEW SELECTOR ---
  const products = useSelector(selectFilteredProducts);
  const { status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsAsync());
    }
  }, [status, dispatch]);
  
  // ... (the rest of the component's return logic is the same)
  if (status === 'loading') { /* ... */ }
  if (status === 'failed') { /* ... */ }

  // --- ADD A MESSAGE FOR WHEN NO PRODUCTS MATCH THE FILTER ---
  if (products.length === 0 && status === 'succeeded') {
    return <div className="text-center text-xl mt-10">No products found in this category.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;