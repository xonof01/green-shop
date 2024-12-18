import { queryClient } from "@/provider/QueryProvider";
import { useMutation } from "@tanstack/react-query";
import { instance } from "./instance";

const likeProduct = async ({ productId }: { productId: string }) => {
  const response = await instance.post("/basket", { productId });
  return response.data;
};

export const useLikeProduct = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: likeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      console.error("Failed to like product:", error);
    },
  });

  return { mutate, isPending, isError };
};
