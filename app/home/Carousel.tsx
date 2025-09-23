'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const imageList: string[] = ['/r6.png', '/fc-25.jpeg'];

function Carousel() {
  const [currImageOnBanner, setImage] = useState<number>(0);
  const [isTransitioning, setTransition] = useState<boolean>(true);

  useEffect(() => {
    if (isTransitioning) {
      const intervalId = setInterval(() => {
        setImage((prevIndex) => (prevIndex + 1) % imageList.length);
      }, 5000);
      return () => clearInterval(intervalId);
    } else {
      const timeOutID = setTimeout(() => setTransition(true), 20000);
      return () => clearTimeout(timeOutID);
    }
  }, [isTransitioning]);

  const handleNextArrowBtn = () => {
    setImage((prevIndex) => (prevIndex + 1) % imageList.length);
    setTransition(false);
  };

  const handlePrevArrowBtn = () => {
    setImage((prevIndex) => (prevIndex - 1 + imageList.length) % imageList.length);
    setTransition(false);
  };

  return (
    /**
     * Mobile: full-bleed (w-screen + centering).
     * Desktop: width = 100vw - sidebar width, no extra left margin (parent already has md:ml-60).
     * Update --sidebar-w if your sidebar width changes (ml-60 ≈ 15rem).
     */
    <section
      className="
        relative select-none -mt-16
        w-screen left-1/2 -translate-x-1/2
        md:[--sidebar-w:15rem]
        md:w-[calc(100vw-var(--sidebar-w))] md:left-auto md:translate-x-0
      "
    >
      <div className="relative h-[42vh] min-h-[16rem] md:h-[64vh]">
        <Image
          src={imageList[currImageOnBanner]}
          alt="Main Carousel"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Left arrow: just inside the carousel area (which starts right after the sidebar on desktop) */}
        <button
          type="button"
          aria-label="Previous"
          onClick={handlePrevArrowBtn}
          className="
            absolute top-1/2 -translate-y-1/2
            left-3 md:left-6
            rounded-full bg-black/50 backdrop-blur-sm
            h-10 w-10 grid place-items-center hover:bg-black/60
            z-50
          "
        >
          <MdKeyboardArrowLeft className="text-2xl" />
        </button>

        {/* Right arrow: far right edge of visible carousel area */}
        <button
          type="button"
          aria-label="Next"
          onClick={handleNextArrowBtn}
          className="
            absolute top-1/2 -translate-y-1/2
            right-3 md:right-6
            rounded-full bg-black/50 backdrop-blur-sm
            h-10 w-10 grid place-items-center hover:bg-black/60
            z-50
          "
        >
          <MdKeyboardArrowRight className="text-3xl" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex w-full gap-2 justify-center mt-4 z-40">
        {imageList.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setImage(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 w-2.5 rounded-full ${index === currImageOnBanner ? "bg-blue-400" : "bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Carousel;
