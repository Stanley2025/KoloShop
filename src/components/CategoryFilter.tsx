// src/components/CategoryFilter.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchCategoriesAsync, setCategory } from '../redux/productSlice';

const CategoryFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, selectedCategory } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategoriesAsync());
    }
  }, [dispatch, categories.length]);

  const handleCategoryClick = (category: string | null) => {
    dispatch(setCategory(category));
  };

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-3">
      {/* All Products Button */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
          ${!selectedCategory 
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
      >
        All Products
      </button>

      {/* Category Buttons */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
            ${selectedCategory === category 
              ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg transform scale-105' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
