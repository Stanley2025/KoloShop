// src/components/CategoryFilter.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchCategoriesAsync, setCategory } from '../redux/productSlice';

const CategoryFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, selectedCategory } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    // Fetch categories only if they haven't been fetched yet
    if (categories.length === 0) {
      dispatch(fetchCategoriesAsync());
    }
  }, [dispatch, categories.length]);

  const handleCategoryClick = (category: string | null) => {
    dispatch(setCategory(category));
  };

  const baseButtonClass = "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200";
  const inactiveButtonClass = "bg-white text-gray-700 hover:bg-gray-200";
  const activeButtonClass = "bg-blue-600 text-white shadow-md";

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      <button
        onClick={() => handleCategoryClick(null)}
        className={`${baseButtonClass} ${!selectedCategory ? activeButtonClass : inactiveButtonClass}`}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`${baseButtonClass} ${selectedCategory === category ? activeButtonClass : inactiveButtonClass}`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;