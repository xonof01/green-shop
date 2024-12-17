"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../ProductCard/type";
import HeroImg from "@/assets/images/HeroImg.jpg";

interface Props {
  products: Product[];
}

const PRODUCTS_PER_SLIDE = 5;

export default function RelatedProducts({ products }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(products.length / PRODUCTS_PER_SLIDE);
  const slideRef = useRef<HTMLDivElement>(null);
  console.log(products);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  return (
    <div className="container py-12 mb-16">
      <h2 className="text-2xl font-semibold mb-8 text-green-600 pb-5 border-b border-b-green-400">
        Related Products
      </h2>

      <div className="relative overflow-hidden">
        <div
          ref={slideRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ width: `${totalSlides * 100}%` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="flex justify-between w-full px-4"
              style={{ width: `${100 / totalSlides}%` }}
            >
              {products
                .slice(
                  slideIndex * PRODUCTS_PER_SLIDE,
                  (slideIndex + 1) * PRODUCTS_PER_SLIDE
                )
                .map((product) => (
                  <div key={product.product_id} className="w-1/5 px-2">
                    <Link
                      href={`/product/${product.product_id}`}
                      className="group block"
                    >
                      <div className="relative aspect-square mb-2 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.image_url?.[0] || HeroImg}
                          alt={product.product_name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">
                        {product.product_name}
                      </h3>
                      <p className="text-green-600 font-medium text-sm">
                        ${product.cost.toFixed(2)}
                      </p>
                    </Link>
                  </div>
                ))}
              {slideIndex === totalSlides - 1 &&
                Array.from({
                  length:
                    PRODUCTS_PER_SLIDE - (products.length % PRODUCTS_PER_SLIDE),
                }).map((_, index) => (
                  <div key={`empty-${index}`} className="w-1/5 px-2" />
                ))}
            </div>
          ))}
        </div>

        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-green-600" : "bg-gray-200"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
