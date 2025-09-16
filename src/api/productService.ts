// src/api/productService.ts
import axios from 'axios';
import { Product } from '../types';

const API_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (): Promise<Product[]> => {
  //... (existing function is unchanged)
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// --- ADD THIS NEW FUNCTION ---
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(`${API_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};