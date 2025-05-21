"use client";

import Image from "next/image";
import { useState } from "react";
import thumbnails from "../galleryData";
import galleryImages from "../galleryData";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (url) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-12 mb-12">
      <div className="grid grid-cols-1 mx-1 sm:grid-cols-2 md:grid-cols-3 max-w-3xl gap-4">
        {galleryImages.map((src, index) => (
          <Image
            key={index}
            width={500}
            height={500}
            src={src}
            className="rounded-lg h-70 md:h-70 object-cover cursor-pointer hover:opacity-80"
            alt={`galleryImage ${index + 1}`}
            onClick={() => openModal(src)}
          />
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-full max-h-full p-4">
            <button
              onClick={closeModal}
              className="absolute top-3 right-6 text-blue-700 text-3xl font-bold z-50 cursor-pointer"
            >
              &times;
            </button>
            <Image
              src={selectedImage}
              alt="Selected"
              width={800}
              height={800}
              className="rounded max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
