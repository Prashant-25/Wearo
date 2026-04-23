'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, ChevronDown, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FilterSidebar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isOpen, setIsOpen] = useState(false)

    const [priceRange, setPriceRange] = useState({
        min: parseInt(searchParams.get('min')) || 0,
        max: parseInt(searchParams.get('max')) || 5000,
    })

    const currentFilters = {
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        fabric: searchParams.get('fabric') || '',
        sleeve: searchParams.get('sleeve') || '',
        neck: searchParams.get('neck') || '',
        fitType: searchParams.get('fitType') || '',
        gender: searchParams.get('gender') || '',
        size: searchParams.get('size') || '',
        color: searchParams.get('color') || '',
        rating: searchParams.get('rating') || '',
        priceMin: searchParams.get('min') || '',
        priceMax: searchParams.get('max') || '',
        tags: searchParams.get('tags') || '',
    }

    const categories = ['All Products', "Men's Fashion", "Women's Fashion", 'Oversized', 'New Arrivals']
    const fabrics = ['Viscose', 'Cotton Linen', 'Cotton']
    const sleeves = ['Half Sleeves', 'Full Sleeves']
    const necks = ['Collared']
    const fitTypes = ['Regular Fit', 'Relaxed Fit', 'Oversized']

    const genders = ['Men', 'Women', 'Unisex']
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const colors = [
        { name: 'Black', value: '#000000' },
        { name: 'White', value: '#FFFFFF' },
        { name: 'Navy', value: '#001F3F' },
        { name: 'Gray', value: '#808080' },
        { name: 'Brown', value: '#8B4513' },
        { name: 'Red', value: '#FF0000' },
        { name: 'Blue', value: '#0074D9' },
        { name: 'Green', value: '#2ECC40' },
    ]

    const ratings = [
        { value: 5, label: '5 Stars' },
        { value: 4, label: '4+ Stars' },
        { value: 3, label: '3+ Stars' },
        { value: 1, label: 'All Ratings' },
    ]

    const handleFilterChange = (filterType, value) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value) {
            params.set(filterType === 'priceMin' ? 'min' : filterType === 'priceMax' ? 'max' : filterType, value)
        } else {
            params.delete(filterType === 'priceMin' ? 'min' : filterType === 'priceMax' ? 'max' : filterType)
        }

        params.set('page', '1')
        router.push(`?${params.toString()}`)
    }

    const handlePriceRangeChange = (type, value) => {
        const newValue = parseInt(value) || 0
        const updated = { ...priceRange, [type]: newValue }

        // Ensure min doesn't exceed max and vice versa
        if (type === 'min' && newValue > priceRange.max) {
            updated.max = newValue
        }
        if (type === 'max' && newValue < priceRange.min) {
            updated.min = newValue
        }

        setPriceRange(updated)

        const params = new URLSearchParams(searchParams.toString())
        params.set('min', updated.min)
        params.set('max', updated.max)
        params.set('page', '1')
        router.push(`?${params.toString()}`)
    }

    const handleClearFilters = () => {
        router.push('?')
        setIsOpen(false)
    }

    const hasActiveFilters = Object.values(currentFilters).some(v => v)

    return (
        <>
            {/* Mobile Filter Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex items-center gap-2 px-4 py-2 mb-4 border border-gray-200 rounded-lg text-black hover:bg-gray-50"
            >
                <Filter size={20} />
                Filters
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 md:hidden z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`top-16 md:h-fit fixed rounded-sm
          md:sticky md:top-24 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 
          transform transition-transform md:transform-none z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col overflow-y-auto
        `}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between md:block">
                    <h2 className="font-semibold text-black text-lg">Filters</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Filters Content */}
                <div className="flex-1 p-4 space-y-6">
                    {/* Category */}
                    <FilterSection title="Category">
                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={cat}
                                        checked={currentFilters.category === cat}
                                        onChange={(e) => handleFilterChange('category', e.target.value)}
                                        className="w-4 h-4 accent-cyan-600"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-black">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Fabric */}
                    <FilterSection title="Fabric">
                        <div className="space-y-2">
                            {fabrics.map((fabric) => (
                                <label key={fabric} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={currentFilters.fabric === fabric}
                                        onChange={(e) => handleFilterChange('fabric', e.target.checked ? fabric : '')}
                                        className="w-4 h-4 accent-cyan-600 rounded"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-black">{fabric}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Sleeve */}
                    <FilterSection title="Sleeve Type">
                        <div className="space-y-2">
                            {sleeves.map((sleeve) => (
                                <label key={sleeve} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={currentFilters.sleeve === sleeve}
                                        onChange={(e) => handleFilterChange('sleeve', e.target.checked ? sleeve : '')}
                                        className="w-4 h-4 accent-cyan-600 rounded"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-black">{sleeve}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Neck */}
                    <FilterSection title="Neck Style">
                        <div className="space-y-2">
                            {necks.map((neck) => (
                                <label key={neck} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={currentFilters.neck === neck}
                                        onChange={(e) => handleFilterChange('neck', e.target.checked ? neck : '')}
                                        className="w-4 h-4 accent-cyan-600 rounded"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-black">{neck}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Fit Type */}
                    <FilterSection title="Fit Type">
                        <div className="space-y-2">
                            {fitTypes.map((fitType) => (
                                <label key={fitType} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={currentFilters.fitType === fitType}
                                        onChange={(e) => handleFilterChange('fitType', e.target.checked ? fitType : '')}
                                        className="w-4 h-4 accent-cyan-600 rounded"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-black">{fitType}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Gender */}
                    <FilterSection title="Gender">
                        <div className="space-y-2">
                            {genders.map((gender) => (
                                <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={currentFilters.gender === gender}
                                        onChange={(e) => handleFilterChange('gender', e.target.checked ? gender : '')}
                                        className="w-4 h-4 accent-cyan-600 rounded"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-black">{gender}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Size */}
                    <FilterSection title="Size">
                        <div className="flex flex-wrap gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handleFilterChange('size', currentFilters.size === size ? '' : size)}
                                    className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${currentFilters.size === size
                                            ? 'bg-black text-white'
                                            : 'border border-gray-200 text-gray-700 hover:border-black'
                                        }
                  `}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Price Range - Single Component */}
                    <FilterSection title="Price Range">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                                <div className="text-center flex-1">
                                    <label className="text-xs text-gray-600 block mb-1">Min</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max={priceRange.max}
                                        value={priceRange.min}
                                        onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                                        className="w-full px-2 py-1 bg-transparent text-center font-semibold text-black focus:outline-none"
                                    />
                                </div>
                                <div className="text-gray-400 px-2">—</div>
                                <div className="text-center flex-1">
                                    <label className="text-xs text-gray-600 block mb-1">Max</label>
                                    <input
                                        type="number"
                                        min={priceRange.min}
                                        max="5000"
                                        value={priceRange.max}
                                        onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                                        className="w-full px-2 py-1 bg-transparent text-center font-semibold text-black focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Range Slider Track */}
                            {/* <div className="relative pt-6">
                                <div className="absolute w-full h-1 bg-gray-200 rounded-lg top-0"></div>
                                <div
                                    className="absolute h-1 bg-cyan-600 rounded-lg top-0"
                                    style={{
                                        left: `${(priceRange.min / 5000) * 100}%`,
                                        right: `${100 - (priceRange.max / 5000) * 100}%`,
                                    }}
                                ></div>
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    value={priceRange.min}
                                    onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                                    className="absolute w-full h-1 bg-transparent rounded-lg appearance-none cursor-pointer pointer-events-none"
                                    style={{
                                        zIndex: priceRange.min > 2500 ? 5 : 3,
                                    }}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    value={priceRange.max}
                                    onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                                    className="absolute w-full h-1 bg-transparent rounded-lg appearance-none cursor-pointer pointer-events-none"
                                    style={{
                                        zIndex: priceRange.max < 2500 ? 5 : 3,
                                    }}
                                />
                                <style jsx>{`
                  input[type='range'] {
                    -webkit-appearance: none;
                    width: 100%;
                  }
                  input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: white;
                    border: 3px solid #06b6d4;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  }
                  input[type='range']::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: white;
                    border: 3px solid #06b6d4;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  }
                `}</style>
                            </div> */}

                            <div className="text-sm text-gray-600 text-center">
                                ₹{priceRange.min.toLocaleString()} — ₹{priceRange.max.toLocaleString()}
                            </div>
                        </div>
                    </FilterSection>

                    {/* Rating */}
                    <FilterSection title="Rating">
                        <div className="space-y-2">
                            {ratings.map((rating) => (
                                <label key={rating.value} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="rating"
                                        value={rating.value}
                                        checked={currentFilters.rating === String(rating.value)}
                                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                                        className="w-4 h-4 accent-cyan-600"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-black">{rating.label}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>
                </div>

                {/* Footer - Clear Filters */}
                {hasActiveFilters && (
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                        <Button
                            onClick={handleClearFilters}
                            className="w-full bg-gray-100 text-black hover:bg-gray-200"
                        >
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </aside>
        </>
    )
}

function FilterSection({ title, children }) {
    const [isExpanded, setIsExpanded] = useState(true)

    return (
        <div className="border-b border-gray-100 pb-6 last:border-b-0">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`flex items-center justify-between w-full group ${isExpanded ? 'mb-2' : ''}`}
            >
                <h3 className="font-medium text-black text-sm">{title}</h3>
                <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
            </button>
            {isExpanded && <div>{children}</div>}
        </div >
    )
}
