import { useEffect, useState } from 'react';
import { Product } from '../models/Product';
import { apiService } from '../services/api';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch?: () => Promise<void>;
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.fetchProducts();
      setProducts(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch products';
      setError(errorMessage);
      console.error('Error in useProducts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const refetch = async () => {
    await loadProducts();
  };

  return { products, loading, error, refetch };
};

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.fetchProductById(id);
        setProduct(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch product';
        setError(errorMessage);
        console.error('Error in useProduct:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  return { product, loading, error };
};
