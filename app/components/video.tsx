"use client";
import { useState } from "react";

interface VideoProps {
  id: string;
}

export default function Video({ id }: VideoProps) {
  const [hasClicked, setHasClicked] = useState(false);

  return (
    <div
      className="relative bg-[url('/backgrounds/pattern-flowers.svg')] min-w-[300px] w-[80%] sm:w-[50%] md:w-full aspect-[9/23] rounded-xl bg-black flex items-center justify-center cursor-pointer"
      onClick={() => setHasClicked(true)}
    >
      {!hasClicked ? (
        <div className="relative w-64 h-64 bg-cover bg-center rounded-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
            </svg>
          </div>
        </div>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.tiktok.com/embed/${id}`}
          frameBorder="0"
          allow="fullscreen"
          allowFullScreen
        />
      )}
    </div>
  );
}
