"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Button from "../Button";
import HeroImg from "@/assets/images/HeroImg.jpg";

const banners = [
  {
    id: 1,
    title: "Let's Make A Better",
    subtitle: "Planet",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create a unique Urban Jungle. Order your favorite plants!",
    image: HeroImg,
  },
  {
    id: 2,
    title: "Grow Your Own",
    subtitle: "Garden",
    description:
      "Discover the joy of growing your own plants at home. GreenShop has everything you need for your indoor garden adventure!",
    image: HeroImg,
  },
  {
    id: 3,
    title: "Bring Nature Into",
    subtitle: "Your Home",
    description:
      "Make your living space lively and vibrant with fresh plants and greenery. Choose your favorites from our wide collection!",
    image: HeroImg,
  },
];

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = banners.length;
  const slideRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${
        (currentSlide * 100) / 3
      }%)`;
    }
  }, [currentSlide]);

  return (
    <section className="w-full py-4">
      <div className="container px-0.5">
        <div className="relative overflow-hidden px-6 rounded-xl">
          <div
            ref={slideRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${totalSlides * 100}%` }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="w-full flex-shrink-0 flex flex-col md:flex-row items-center"
                style={{ width: `${100 / totalSlides}%` }}
              >
                <div className="flex-1 p-6">
                  <span className="inline-block text-sm font-medium tracking-wider text-gray-500 uppercase mb-4">
                    Welcome to GreenShop
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 uppercase">
                    {banner.title} <br />
                    <span className="text-green-600">{banner.subtitle}</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-lg mb-8">
                    {banner.description}
                  </p>
                  <Button
                    type="button"
                    title="Shop Now"
                    extraStyle="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-6 h-[40px] text-base uppercase tracking-wide"
                  />
                </div>
                <div className="flex-1 relative w-full md:h-[600px]">
                  <Image
                    src={banner.image}
                    alt="Beautiful potted plant"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>

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

          <div className="flex justify-center gap-2 mt-4">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? "bg-green-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
