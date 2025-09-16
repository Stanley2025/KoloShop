// src/redux/productSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';
import { fetchProducts as fetchProductsAPI, fetchCategories as fetchCategoriesAPI } from '../api/productService';
import { RootState } from './store';

// --- CONSTANTS AND TYPES ---
type SortOrder = 'default' | 'price-asc' | 'price-desc';
export const ITEMS_PER_PAGE = 8;

// --- STATE INTERFACE ---
interface ProductsState {
  items: Product[];
  categories: string[];
  selectedCategory: string | null;
  sortOrder: SortOrder;
  currentPage: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// --- INITIAL STATE ---
const initialState: ProductsState = {
  items: [],
  categories: [],
  selectedCategory: null,
  sortOrder: 'default',
  currentPage: 1,
  status: 'idle',
  error: null,
};

// --- ASYNC THUNKS (The part that was causing errors) ---
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProductsAPI();
    return response;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fetchCategoriesAPI();
    return response;
  }
);

// --- THE SLICE ---
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1; // Reset page on filter change
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
      state.currentPage = 1; // Reset page on sort change
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.categories = action.payload;
      });
  },
});

// --- ACTIONS AND SELECTORS ---
export const { setCategory, setSortOrder, setCurrentPage } = productSlice.actions;

export const selectPaginatedProducts = (state: RootState) => {
  const { items, selectedCategory, sortOrder, currentPage } = state.products;

  // Filter
  const filteredItems = selectedCategory
    ? items.filter(item => item.category === selectedCategory)
    : items;

  // Sort
  const sortedItems = [...filteredItems];
  if (sortOrder === 'price-asc') {
    sortedItems.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    sortedItems.sort((a, b) => b.price - a.price);
  }

  // Paginate
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = sortedItems.slice(startIndex, endIndex);

  return {
    products: paginatedItems,
    totalItems: sortedItems.length, // The total count of items *after* filtering/sorting
  };
};

export default productSlice.reducer;