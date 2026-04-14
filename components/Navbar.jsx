"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Oversized", href: "/oversized" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Collections", href: "/collections" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-100 dark:border-white/5">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center shadow-sm">
              <span className="text-white dark:text-black font-bold text-base leading-none">
                W
              </span>
            </div>
            <span className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Wearo.
            </span>
          </Link>

          {/* Center Nav Links — hidden on mobile */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-3 lg:px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg
                      ${
                        isActive
                          ? "text-zinc-900 dark:text-white"
                          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      }`}
                  >
                    {link.label}
                    {/* Active underline indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2.5px] rounded-full bg-indigo-500" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              aria-label="Search"
              className="relative p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors duration-200"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors duration-200"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              {/* Badge */}
              <span className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white bg-indigo-500 rounded-full leading-none">
                3
              </span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors duration-200"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {/* Badge */}
              <span className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white bg-indigo-500 rounded-full leading-none">
                1
              </span>
            </Link>

            {/* Profile Avatar */}
            <Link
              href="/profile"
              aria-label="Profile"
              className="ml-1 sm:ml-2 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold shadow-sm hover:shadow-md transition-shadow duration-200 ring-2 ring-white dark:ring-zinc-900"
            >
              P
            </Link>

            {/* Mobile hamburger */}
            <button
              aria-label="Open menu"
              className="md:hidden relative p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors duration-200 ml-1"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
