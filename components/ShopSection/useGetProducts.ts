import { useEffect, useState } from "react";
import { Product } from "../ProductCard/type";
import { instance } from "@/hooks/instance";

export const useGetProducts = (page: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance().get<{ products: Product[] }>(
          "/products",
          {
            params: { page, limit: 9 },
          }
        );
        setProducts(response.data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return { products, isProductLoading: loading, error };
};
