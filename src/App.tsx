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
      <main className="flex-grow container mx-auto pt-20 px-4">
        
        {/* --- THIS IS THE NEW PAGE HEADER WE ADDED --- */}
        <div className="text-center my-8">
          <h2 className="text-4xl font-bold text-gray-800">Explore Our Products</h2>
          <p className="text-gray-600 mt-2">Find the best items, curated just for you.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
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