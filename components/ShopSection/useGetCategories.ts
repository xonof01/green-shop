import { instance } from "@/hooks/instance";
import { useQuery } from "@tanstack/react-query";

export interface Category {
  category_id: string;
  category_name: string;
}

export const useGetCategories = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      instance
        .get<{ categories: Category[] }>("/categories", {
          params: { page: 1, limit: 9 },
        })
        .then((res) => res.data.categories),
  });

  return { categories, isCategoryLoading: isLoading, isError };
};
