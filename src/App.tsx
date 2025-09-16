// src/App.tsx

import React from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import CategoryFilter from './components/CategoryFilter'; // <-- IMPORT

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto mt-6 px-4">
        <CategoryFilter /> {/* <-- ADD COMPONENT HERE */}
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default App;