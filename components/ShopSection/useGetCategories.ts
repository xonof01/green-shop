import { useEffect, useState } from "react";
import { instance } from "@/hooks/instance";

export interface Category {
  category_id: string;
  category_name: string;
}

export const useGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await instance().get<{ categories: Category[] }>(
          "/categories",
          {
            params: { page: 1, limit: 9 },
          }
        );
        setCategories(response.data.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isCategoryLoading: loading, error };
};
