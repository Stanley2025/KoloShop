// src/api/productService.ts

import axios from 'axios';
import { Product } from '../types';

const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    // In a real-world app, you might want to throw a custom error
    // or handle it more gracefully.
    throw error;
  }
};