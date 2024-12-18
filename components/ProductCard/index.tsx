import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Product } from "./type";
import HeroImg from "@/assets/images/HeroImg.jpg";
import { useLikeProduct } from "@/hooks/useLikeProduct";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { product_id, product_name, image_url, discount, cost } = product;
  const router = useRouter();
  const { mutate } = useLikeProduct();

  return (
    <div className="group relative cursor-pointer">
      <div className="h-0.5 w-full opacity-0 group-hover:opacity-100 group-hover:bg-green-600 transition-all duration-300" />
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <Image
          src={image_url?.[0] || HeroImg}
          alt={product_name}
          fill
          className="object-cover object-center"
          onClick={() => router.push(`/shop/${product_id}`)}
        />
        <div className="absolute bottom-[-50%] left-1/2 transform -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-300">
          <button className="p-3 bg-white rounded-full shadow-md hover:bg-green-600 hover:text-white transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          <button
            onClick={() => mutate({ productId: product.product_id })}
            className={`p-3 rounded-full shadow-md hover:bg-green-600 hover:text-white transition-colors ${
              product.basket ? "bg-green-600" : "bg-white"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button className="p-3 bg-white rounded-full shadow-md hover:bg-green-600 hover:text-white transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-medium text-gray-900">{product_name}</h3>
        <div className="flex items-center gap-2">
          {discount && <del className="text-gray-400">${discount}</del>}
          <strong className="text-green-600">${cost.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};
