"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import imageUrls from "./imageData";

const HomePage = () => {
  const sliderRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  const openModal = (url) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sliderRef.current && !sliderRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      setCurrentSlide(nextSlide);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      sliderRef.current.style.transform = `translateX(-${
        currentSlide * slideWidth
      }px)`;
    }
  }, [currentSlide]);

  return (
    <div className="flex flex-col items-center overflow-hidden max-w-3xl mx-auto pt-12 pb-12">
      <div className="w-full overflow-hidden relative rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          id="slider"
          ref={sliderRef}
        >
          <div className="relative w-full h-[400px] flex-shrink-0 overflow-hidden rounded-2xl">
            <Image
              fill
              src="/pic1.png"
              className="object-cover rounded-2xl"
              alt="Slide 1"
            />
          </div>
          <div className="relative w-full h-[400px] flex-shrink-0 overflow-hidden rounded-2xl">
            <Image
              fill
              src="/pic2.png"
              className="object-cover rounded-2xl"
              alt="Slide 2"
            />
          </div>
          <div className="relative w-full h-[400px] flex-shrink-0 overflow-hidden rounded-2xl">
            <Image
              fill
              src="/pic3.png"
              className="object-cover rounded-2xl"
              alt="Slide 3"
            />
          </div>
          <div className="relative w-full h-[400px] flex-shrink-0 overflow-hidden rounded-2xl">
            <Image
              fill
              src="/pic1.png"
              className="object-cover rounded-2xl"
              alt="Slide 4"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center mt-5 space-x-2" id="dot-indicators">
        {[...Array(totalSlides)].map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-black" : "bg-black/20"
            }`}
          ></span>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-12 mt-12">
        {imageUrls.map((url, index) => (
          <div className="relative h-55 w-55" key={index}>
            <Image
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded object-cover cursor-pointer hover:opacity-80"
              src={url}
              alt={`userImage${index + 1}`}
              onClick={() => openModal(url)}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-blue-700 font-bold text-xl cursor-pointer"
            >
              X
            </button>
            <Image
              src={selectedImage}
              alt="Selected Image"
              width={500}
              height={500}
              className="rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
