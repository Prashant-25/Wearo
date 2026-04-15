import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[600px] lg:min-h-[700px] rounded-2xl lg:rounded-3xl overflow-hidden bg-zinc-900 shadow-[0_8px_40px_rgba(0,0,0,0.15)] flex items-center">
      {/* Full-width high-resolution banner image */}
      <Image
        src="/hero-oversized.png"
        alt="Three models wearing oversized streetwear hoodies"
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1400px"
        priority
      />

      {/* Gradient overlay — neutral high-contrast palette (whites, grays, deep blacks) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />

      {/* Left-aligned bold typography with dual CTA buttons */}
      <div className="relative z-10 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 py-12 h-full w-full">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Tag badge — rounded corners, soft contemporary feel */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-md mb-6 sm:mb-8 shadow-sm">
            <span className="text-yellow-400 text-sm" aria-hidden="true">⚡</span>
            <span className="text-indigo-300 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Streetwear 2026
            </span>
          </div>

          {/* Bold, high-impact sans-serif heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black text-white tracking-tight leading-[1.05] mb-4 sm:mb-6">
            New Drop:
            <br />
            Oversized
            <br />
            Collection
          </h1>

          {/* Clean, legible medium-weight description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-10 max-w-md lg:max-w-lg font-light leading-relaxed">
            Discover luxury fashion and iconic designer brands. Redefining
            comfort with architectural silhouettes.
          </p>

          {/* Dual CTA buttons — rounded corners, soft shadows */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/products/oversized"
              className="group inline-flex items-center justify-center gap-3 bg-white text-black px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-md transition-all duration-200 hover:scale-[1.04] hover:shadow-lg active:scale-95"
            >
              Shop Now
              <span className="inline-flex items-center justify-center bg-black text-white rounded-full p-1.5 transition-transform duration-200 group-hover:translate-x-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>

            <Link
              href="/collections"
              className="inline-flex items-center justify-center px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg text-white border border-white/25 bg-white/10 backdrop-blur-md shadow-md transition-all duration-200 hover:bg-white/20 hover:border-white/40 active:scale-95"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
