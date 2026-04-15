import Link from "next/link";
import { Button } from "@/components/ui/button";

// Static collections data
const collections = [
  {
    id: "summer-essentials",
    title: "Summer Essentials",
    description: "Lightweight fabrics and vibrant colors for the sunny days ahead.",
    link: "/products/new-arrivals",
    span: "md:col-span-2 lg:col-span-2"
  },
  {
    id: "streetwear-vol1",
    title: "Streetwear Vol. 1",
    description: "Bold graphics and relaxed fits designed for the urban landscape.",
    link: "/products/oversized",
    span: "md:col-span-1 lg:col-span-1"
  },
  {
    id: "minimalist-basics",
    title: "Minimalist Basics",
    description: "High-quality everyday wear to build your perfect capsule wardrobe.",
    link: "/products",
    span: "col-span-1 flex-col"
  },
  {
    id: "athletic-performance",
    title: "Athletic Performance",
    description: "Engineered for movement. Breathable, durable, and stylish.",
    link: "/products",
    span: "md:col-span-2 lg:col-span-2"
  }
];

export const metadata = {
  title: "Collections | Wearo",
  description: "Explore our curated fashion collections.",
};

export default function CollectionsPage() {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
          Curated Collections
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Discover our thoughtfully assembled edits designed for every season, style, and occasion. 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <div 
            key={collection.id} 
            className={`group relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 min-h-[400px] md:min-h-[500px] flex rounded-none ${collection.span}`}
          >
            {/* Background Placeholder Image area */}
            <div className="absolute inset-0 z-0 bg-zinc-200 dark:bg-zinc-800 transition-transform duration-700 group-hover:scale-105 flex items-center justify-center">
               {/* Replace this div with an actual <Image fill ... /> component later */}
               <span className="text-zinc-400 dark:text-zinc-600 font-medium tracking-widest uppercase text-sm">Large Image Overlay</span>
            </div>

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            {/* Content Container */}
            <div className="relative z-20 flex flex-col justify-end p-8 md:p-12 w-full h-full text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                {collection.title}
              </h2>
              <p className="text-zinc-300 max-w-md mb-8 text-base md:text-lg">
                {collection.description}
              </p>
              <div>
                <Button asChild size="lg" className="rounded-none bg-white text-black hover:bg-zinc-200 uppercase tracking-widest text-xs font-bold">
                  <Link href={collection.link}>
                    Explore Collection
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
