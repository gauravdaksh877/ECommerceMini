import { Product } from '../models/Product';

const BASE_URL = 'https://fakestoreapi.com';

interface ApiError {
  message: string;
  code?: string;
}

class ApiService {
  async fetchProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data: Product[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw this.handleError(error);
    }
  }

  async fetchProductById(id: number): Promise<Product> {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data: Product = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message || 'An error occurred while fetching data',
        code: 'API_ERROR',
      };
    }
    return {
      message: 'An unknown error occurred',
      code: 'UNKNOWN_ERROR',
    };
  }
}

export const apiService = new ApiService();
