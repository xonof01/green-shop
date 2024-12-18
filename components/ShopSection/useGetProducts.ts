import { Product } from "../ProductCard/type";
import { instance } from "@/hooks/instance";
import { useQuery } from "@tanstack/react-query";

export interface ProductParams {
  page: number;
  limit: number;
  category?: string;
  size?: string;
  tag?: string | null;
  min_price?: number;
  max_price?: number;
}

export const useGetProducts = (params: ProductParams) => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", params],
    queryFn: () =>
      instance
        .get<{ products: Product[] }>("/products", { params })
        .then((res) => res.data.products),
  });

  return { products, isProductLoading: isLoading, isError };
};
