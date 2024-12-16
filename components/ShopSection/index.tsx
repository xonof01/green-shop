"use client";

import { useState } from "react";
import { ProductCard } from "../ProductCard";
import { useGetProducts } from "./useGetProducts";
import SuperSaleBanner from "@/assets/images/SuperSaleBanner.png";
import Image from "next/image";
import { Categories } from "./Categories";

export default function ShopSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [priceRange, setPriceRange] = useState([39, 630]);

  const { products, loading } = useGetProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="space-y-8">
            <Categories />

            {/* Price Range */}
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

                <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
                  Filter
                </button>
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Size</h2>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 cursor-pointer">
                    Small
                  </span>
                  <span className="text-sm text-gray-400">(119)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 cursor-pointer">
                    Medium
                  </span>
                  <span className="text-sm text-gray-400">(86)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 cursor-pointer">
                    Large
                  </span>
                  <span className="text-sm text-gray-400">(78)</span>
                </li>
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
                onClick={() => setActiveTab("all")}
                className={`pb-2 px-1 ${
                  activeTab === "all"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600"
                }`}
              >
                All Plants
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`pb-2 px-1 ${
                  activeTab === "new"
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
            {loading ? (
              <div>Loading...</div>
            ) : (
              products.map((product) => (
                <ProductCard product={product} key={product.product_id} />
              ))
            )}
          </div>

          <div className="flex justify-end gap-2 mt-16">
            <button className="w-8 h-8 flex items-center justify-center rounded bg-green-600 text-white">
              1
            </button>
            {[2, 3, 4].map((page) => (
              <button
                key={page}
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
              >
                {page}
              </button>
            ))}
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
