// src/components/SortControl.tsx

import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setSortOrder } from '../redux/productSlice';

const SortControl: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // We cast the value to the SortOrder type we defined in our slice
    const order = e.target.value as 'default' | 'price-asc' | 'price-desc';
    dispatch(setSortOrder(order));
  };

  return (
    <div className="flex items-center">
      <label htmlFor="sort-select" className="mr-2 font-medium text-gray-700">Sort by:</label>
      <select
        id="sort-select"
        onChange={handleSortChange}
        className="p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortControl;