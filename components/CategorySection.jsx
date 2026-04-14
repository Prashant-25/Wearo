import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Oversized T-Shirts",
    href: "/category/oversized-tshirts",
    image: "/cat-oversized-tshirts.png",
  },
  {
    name: "Hoodies",
    href: "/category/hoodies",
    image: "/cat-hoodies.png",
  },
  {
    name: "Joggers",
    href: "/category/joggers",
    image: "/cat-joggers.png",
  },
  {
    name: "Full Sleeve",
    href: "/category/full-sleeve",
    image: "/cat-full-sleeve.png",
  },
  {
    name: "Anime",
    href: "/category/anime",
    image: "/cat-anime.png",
  },
  {
    name: "Marvel",
    href: "/category/marvel",
    image: "/cat-marvel.png",
  },
];

export default function CategorySection() {
  return (
    <section className="w-full py-10 sm:py-14">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Shop By Categories
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-1">
            Explore our curated styles
          </p>
        </div>
        <Link
          href="/categories"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          View All
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            {/* Bottom gradient overlay for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
            {/* Category name */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
              <span className="text-sm sm:text-base font-semibold text-white drop-shadow-sm">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile View All link */}
      <div className="flex sm:hidden justify-center mt-6">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          View All
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
