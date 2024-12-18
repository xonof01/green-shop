import { Product } from "@/components/ProductCard/type";
import { instance } from "@/hooks/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetBaskets = () => {
  const {
    data: baskets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["baskets"],
    queryFn: () =>
      instance
        .get<{ productId: Product[]; totalCount: number; userId: string }>(
          "/baskets",
          {
            params: { page: 1, limit: 30 },
          }
        )
        .then((res) => res.data),
    retry: 0,
  });

  return { baskets, isLoading, isError };
};
