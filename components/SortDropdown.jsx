'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

export default function SortDropdown() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const currentSort = searchParams.get('sort') || 'newest'

    const sortOptions = [
        { value: 'newest', label: 'Newest' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'best-selling', label: 'Best Selling' },
        { value: 'top-rated', label: 'Top Rated' },
        { value: 'trending', label: 'Trending' },
    ]

    const handleSort = (value) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', value)
        params.set('page', '1')
        router.push(`?${params.toString()}`)
        setIsOpen(false)
    }

    const selectedLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Sort By'

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-black hover:bg-gray-50 transition-colors"
            >
                <span className="text-sm font-medium">{selectedLabel}</span>
                <ChevronDown
                    size={18}
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                    <div className="py-2">
                        {sortOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleSort(option.value)}
                                className={`
                  w-full px-4 py-2 text-left text-sm transition-colors
                  ${currentSort === option.value
                                        ? 'bg-cyan-50 text-cyan-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }
                `}
                            >
                                {option.label}
                                {currentSort === option.value && (
                                    <span className="float-right">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
