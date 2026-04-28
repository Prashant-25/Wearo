import Link from "next/link";

export const metadata = {
    title: "Products | Wearo",
    description: "Browse all premium clothing from Wearo.",
};

export default function ProductsLayout({ children }) {
    return (
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            {/* <aside className="w-full md:w-64 shrink-0">
                <div className="sticky top-24 space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
                            Categories
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/products"
                                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products/men"
                                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    Men's Fashion
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products/women"
                                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    Women's Fashion
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
                            Price Range
                        </h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                <input type="checkbox" className="rounded border-zinc-300 dark:border-zinc-700 bg-transparent text-indigo-600 focus:ring-indigo-500" />
                                Under $50
                            </label>
                            <label className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                <input type="checkbox" className="rounded border-zinc-300 dark:border-zinc-700 bg-transparent text-indigo-600 focus:ring-indigo-500" />
                                $50 - $100
                            </label>
                            <label className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                <input type="checkbox" className="rounded border-zinc-300 dark:border-zinc-700 bg-transparent text-indigo-600 focus:ring-indigo-500" />
                                Over $100
                            </label>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
                            Size
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <button key={size} className="w-10 h-10 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-center text-sm hover:border-zinc-900 dark:hover:border-white transition-colors text-zinc-600 dark:text-zinc-400">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside> */}

            {/* Main Content Area */}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
