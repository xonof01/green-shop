"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../ProductCard/type";
import RelatedProducts from "./RelatedProducts";

const sizes = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
];

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.image_url[0]);
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-4">
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-gray-600 hover:text-green-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="#" className="text-gray-600 hover:text-green-600">
          Shop
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-1">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-4 order-2 sm:order-1">
            {product.image_url.map((image) => (
              <button
                key={image}
                onClick={() => setSelectedImage(image)}
                className={`relative w-20 h-20 border-2 rounded-lg overflow-hidden ${
                  selectedImage === image
                    ? "border-green-600"
                    : "border-gray-200"
                }`}
              >
                <Image src={image} alt={image} fill className="object-cover" />
              </button>
            ))}
          </div>

          <div className="relative flex-1 order-1 sm:order-2">
            <Image
              src={selectedImage}
              alt={selectedImage}
              fill
              className="object-cover rounded-lg"
            />
            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl text-green-600 font-bold">
              ${product.cost.toFixed(2)}
            </span>
            <div className="flex items-center">
              {[1, 2, 3, 4].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              ))}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-gray-300"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span className="ml-2 text-gray-600">19 Customer Review</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">Short Description:</h2>
            <p className="text-gray-600">{product.short_description}</p>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">Size:</h2>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setSelectedSize(size.value)}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
                    ${
                      selectedSize === size.value
                        ? "border-green-600 bg-green-50 text-green-600"
                        : "border-gray-200"
                    }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="p-2 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-green-600"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="p-2 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-green-600"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                BUY NOW
              </button>
              <button className="px-8 py-3 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors">
                ADD TO CART
              </button>
              <button className="p-3 border border-green-600 rounded-md hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>SKU: 1995751877966</p>
            <p>Categories: Potter Plants</p>
            <p>Tags: {product.tags.join(", ")}</p>
          </div>

          <div className="mt-6 flex items-center">
            <span className="text-sm text-gray-600 mr-4">
              Share this products:
            </span>
            <div className="inline-flex gap-2">
              <button className="p-2 hover:text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </button>
              <button className="p-2 hover:text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </button>
              <button className="p-2 hover:text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </button>
              <button className="p-2 hover:text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="border-b mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-4 relative ${
                activeTab === "description"
                  ? "text-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              Product Description
              {activeTab === "description" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 relative ${
                activeTab === "reviews"
                  ? "text-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              Reviews (19)
              {activeTab === "reviews" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600" />
              )}
            </button>
          </div>
        </div>

        <div className="prose max-w-none">
          {activeTab === "description" ? (
            <p>{product.product_description}</p>
          ) : (
            <div className="text-gray-600">
              No reviews yet. Be the first to review this product.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
