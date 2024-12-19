import { queryClient } from "@/provider/QueryProvider";
import { useMutation } from "@tanstack/react-query";
import { instance } from "./instance";

const basketProduct = async ({ productId }: { productId: string }) => {
  const response = await instance.post("/basket", { productId });
  return response.data;
};

export const useBasketProduct = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: basketProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      console.error("Failed to basket product:", error);
    },
  });

  return { triggerBasket: mutate, isPending, isError };
};
