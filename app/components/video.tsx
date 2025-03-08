"use client";

interface VideoProps {
  id: string;
}

export default function Video({ id }: VideoProps) {
  return (
    <div className="relative min-w-[300px] w-[80%] sm:w-[50%] md:w-full aspect-[10/16] overflow-hidden rounded-xl">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.tiktok.com/embed/${id}?autoplay=0`}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}
