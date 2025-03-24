import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  { id: 1, bg: "bg-gray-100", text: "First slide", route: "/Web-Development" },
  { id: 2, bg: "bg-gray-200", text: "Second slide", route: "/English" },
  { id: 3, bg: "bg-gray-300", text: "Third slide", route: "/UI-UX" },
  { id: 4, bg: "bg-gray-100", text: "Fourth slide", route: "/Data-Bases" },
  { id: 5, bg: "bg-gray-200", text: "Fifth slide", route: "/Maching-Learning" },
  { id: 6, bg: "bg-gray-300", text: "Sixth slide", route: "/CEO" },
];

const CategoryCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <h1>Browse Categories</h1>
      <div
        data-hs-carousel='{
        "loadingClasses": "opacity-0",
        "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer",
        "isCentered": true,
        "slidesQty": { "xs": 1, "lg": 2 }
      }'
        className="relative"
      >
        <div className="hs-carousel w-full overflow-hidden bg-white rounded-lg ">
          <div className="relative min-h-60 overflow-hidden ">
            <div
              className="hs-carousel-body absolute top-0 bottom-0 left-0 flex transition-transform duration-700 bg-gray-800"
              style={{
                transform: `translateX(-${currentSlide * 200}px)`,
              }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="hs-carousel-slide px-5  flex-shrink-0 w-[300px] md:w-[350px] lg:w[600px]"
                >
                  <Link href={slide.route}>
                    <div
                      className={`flex justify-center h-full ${slide.bg} p-6 rounded-lg`}
                    >
                      <span className="self-center text-sm text-gray-800">
                        {slide.text}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-400 p-2 rounded-full hover:bg-gray-700"
        >
          <span aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </span>
          <span className="sr-only">Previous</span>
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-400 p-2 rounded-full hover:bg-gray-700"
        >
          <span aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
          <span className="sr-only">Next</span>
        </button>
      </div>
    </>
  );
};

export default CategoryCarousel;
