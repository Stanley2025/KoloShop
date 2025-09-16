// src/App.tsx

import React from 'react';
import { useSelector } from 'react-redux'; // <-- IMPORT useSelector
import { RootState } from './redux/store'; // <-- IMPORT RootState
import { ITEMS_PER_PAGE } from './redux/productSlice'; // <-- IMPORT items per page
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import CategoryFilter from './components/CategoryFilter';
import SortControl from './components/SortControl';
import Pagination from './components/Pagination'; // <-- IMPORT Pagination

function App() {
  // We need to know the total number of items after filtering to calculate total pages
  const totalItems = useSelector((state: RootState) => {
    const { items, selectedCategory } = state.products;
    return selectedCategory
      ? items.filter(item => item.category === selectedCategory).length
      : items.length;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto mt-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <CategoryFilter />
          <SortControl />
        </div>
        <ProductList />
        <Pagination totalItems={totalItems} itemsPerPage={ITEMS_PER_PAGE} /> {/* <-- ADD COMPONENT HERE */}
      </main>
      <Footer />
    </div>
  );
}

export default App;