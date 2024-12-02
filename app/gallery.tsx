import Image from "next/image";
import Data from "app/images.json";

export async function Gallery({ month }) {
  const gallery = Data[month];
  return (
    <div className="books grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] px-5 mb-10">
      {gallery.map((image, i) => (
        <Photo key={image.url} priority={i < 10} {...image} />
      ))}
    </div>
  );
}

function Photo({ url, title, day, priority = false }) {
  return (
    <main className="text-sm flex flex-col items-center bg-gray-200 dark:bg-[#333] border border-gray-300 dark:border-gray-800">
      <a
        href={url}
        target="_blank"
        className="flex flex-col items-center p-4 text-center"
      >
        <span className="w-40 h-60 bg-center mb-5 bg-cover relative">
          <Image
            className="grayscale hover:grayscale-0"
            alt={title}
            fill
            style={{ objectFit: "contain" }}
            priority={priority}
            src={url}
          />
        </span>
        <span className="flex flex-row items-center gap-3">
          <span className="inline-block bg-gray-500 dark:bg-[#222] text-white text-xs py-1 px-2 ml-2 rounded-full whitespace-nowrap">
            {day}
          </span>
          <span className="inline-block font-bold">{title}</span>
        </span>
      </a>
    </main>
  );
}
