"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/Iphone1.jpg",
  "/Iphone2.jpg",
  "/Iphone3.jpg",
  "/Iphone4.PNG",
  "/Samsung1.jpg",
  "/Samsung2.jpg",
  "/Samsung3.jpg",
  "/Samsung4.jpg",
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md h-80 relative overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out`}
          style={{
            transform: `translateX(${(index - currentIndex) * 100}%)`,
          }}
        >
          <Image
            src={img}
            alt={`Featured Phone ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}