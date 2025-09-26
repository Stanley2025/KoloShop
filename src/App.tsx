// src/App.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { ITEMS_PER_PAGE } from './redux/productSlice';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import CategoryFilter from './components/CategoryFilter';
import SortControl from './components/SortControl';
import Pagination from './components/Pagination';

function App() {
  const totalItems = useSelector((state: RootState) => {
    const { items, selectedCategory } = state.products;
    return selectedCategory
      ? items.filter(item => item.category === selectedCategory).length
      : items.length;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      {/* 
        THE FIX IS HERE: 
        - Changed pt-16 to pt-20 to perfectly match the navbar height.
        - Removed the extra mt-6 margin.
      */}
      <main className="flex-grow container mx-auto pt-20 px-4">
        {/* 
          AND HERE:
          - Changed mb-8 (margin-bottom) to my-8 (margin-top and margin-bottom) 
            to restore the space between the navbar and the controls.
        */}
        <div className="flex flex-col md:flex-row justify-between items-center my-8 gap-4">
          <CategoryFilter />
          <SortControl />
        </div>
        <ProductList />
        <Pagination totalItems={totalItems} itemsPerPage={ITEMS_PER_PAGE} />
      </main>
      <Footer />
    </div>
  );
}

export default App;