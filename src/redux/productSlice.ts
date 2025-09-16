// src/redux/productSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';
import { fetchProducts as fetchProductsAPI, fetchCategories as fetchCategoriesAPI } from '../api/productService';
import { RootState } from './store'; // Import RootState

// 1. UPDATE THE STATE SHAPE
interface ProductsState {
  items: Product[];
  categories: string[]; // <-- ADDED
  selectedCategory: string | null; // <-- ADDED
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// 2. UPDATE THE INITIAL STATE
const initialState: ProductsState = {
  items: [],
  categories: [], // <-- ADDED
  selectedCategory: null, // <-- ADDED
  status: 'idle',
  error: null,
};

// --- EXISTING THUNK (no change) ---
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProductsAPI();
    return response;
  }
);

// 3. --- ADD NEW ASYNC THUNK FOR CATEGORIES ---
export const fetchCategoriesAsync = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fetchCategoriesAPI();
    return response;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  // 4. --- ADD A NEW REDUCER ---
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
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
      // 5. --- HANDLE THE NEW THUNK'S STATES ---
      .addCase(fetchCategoriesAsync.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.categories = action.payload;
      });
  },
});

// 6. --- EXPORT THE NEW ACTION ---
export const { setCategory } = productSlice.actions;

// 7. --- CREATE A MEMOIZED SELECTOR FOR FILTERED PRODUCTS ---
// This selector computes the filtered list. It's efficient because it
// only recalculates when the items or selectedCategory change.
export const selectFilteredProducts = (state: RootState) => {
  const { items, selectedCategory } = state.products;
  if (!selectedCategory) {
    return items; // Return all items if no category is selected
  }
  return items.filter(item => item.category === selectedCategory);
};

export default productSlice.reducer;