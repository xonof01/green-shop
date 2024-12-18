"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard";
import { useGetProducts } from "./useGetProducts";
import SuperSaleBanner from "@/assets/images/SuperSaleBanner.png";
import Image from "next/image";
import { Categories } from "./Categories";
import { useGetCategories } from "./useGetCategories";
import { Skeleton } from "../Skeleton";

const sizes = ["Small", "Medium", "Large"];

export default function ShopSection() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([39, 630]);
  const [page, setPage] = useState<1 | 2>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [size, setSize] = useState<string>();
  const [filterApplied, setFilterApplied] = useState(false);

  const { categories, isCategoryLoading } = useGetCategories();
  const { products, isProductLoading } = useGetProducts({
    page,
    limit: 9,
    category: selectedCategory,
    size,
    tag: activeTab,
    min_price: filterApplied ? priceRange[0] : undefined,
    max_price: filterApplied ? priceRange[1] : undefined,
  });

  useEffect(() => {
    setFilterApplied(false);
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="space-y-8">
            {isCategoryLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-6 w-64" />
              </div>
            ) : (
              <Categories
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            )}

            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Price Range
              </h2>
              <div className="space-y-1">
                <div className="relative h-8">
                  <input
                    type="range"
                    min="39"
                    max="1230"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value), priceRange[1]])
                    }
                    className="absolute top-0 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600 z-10"
                    style={{
                      zIndex: priceRange[0] > priceRange[1] - 10 ? 1 : 0,
                    }}
                  />
                  <input
                    type="range"
                    min="39"
                    max="1230"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="absolute top-0 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div
                    className="absolute top-0 h-2 bg-green-600 rounded-lg"
                    style={{
                      left: `${((priceRange[0] - 39) / (1230 - 39)) * 100}%`,
                      right: `${
                        100 - ((priceRange[1] - 39) / (1230 - 39)) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-gray-600 text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>

                <button
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                  onClick={() => {
                    setFilterApplied(true);
                    setPage(1);
                  }}
                >
                  Filter
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Size</h2>
              <ul className="space-y-2">
                {sizes.map((size) => (
                  <li
                    key={size}
                    className="flex items-center cursor-pointer"
                    onClick={() => setSize(size)}
                  >
                    {size}
                  </li>
                ))}
              </ul>
            </div>

            {/* Super Sale Banner */}
            <div className="flex-1 relative w-full md:h-[440px]">
              <Image
                src={SuperSaleBanner}
                alt="Beautiful potted plant"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 370px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Tabs and Sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex gap-6 border-b border-gray-200 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab(null)}
                className={`pb-2 px-1 ${
                  activeTab === null
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600"
                }`}
              >
                All Plants
              </button>
              <button
                onClick={() => setActiveTab("new-arrivals")}
                className={`pb-2 px-1 ${
                  activeTab === "new-arrivals"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600"
                }`}
              >
                New Arrivals
              </button>
              <button
                onClick={() => setActiveTab("sale")}
                className={`pb-2 px-1 ${
                  activeTab === "sale"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600"
                }`}
              >
                Sale
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Short by:</span>
              <select className="border rounded-md py-1 px-2 text-gray-600 focus:outline-none focus:border-green-600">
                <option>Default sorting</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isProductLoading ? (
              <>
                <Skeleton className="w-auto h-80" />
                <Skeleton className="w-auto h-80" />
                <Skeleton className="w-auto h-80" />
                <Skeleton className="w-auto h-80" />
                <Skeleton className="w-auto h-80" />
                <Skeleton className="w-auto h-80" />
              </>
            ) : (
              products?.map((product) => (
                <ProductCard product={product} key={product.product_id} />
              ))
            )}
          </div>

          <div className="flex justify-end gap-2 mt-16">
            <button
              className="w-8 h-8 flex items-center justify-center rounded bg-green-600 text-white"
              onClick={() => setPage(1)}
            >
              1
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
              onClick={() => setPage(2)}
            >
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
