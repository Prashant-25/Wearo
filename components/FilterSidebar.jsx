'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, ChevronDown, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export default function FilterSidebar() {
    const router = useRouter()
    const route = usePathname()

    console.log("Current Route: ", route)

    const searchParams = useSearchParams()
    const [isOpen, setIsOpen] = useState(false)

    const getParamArray = (key) => {
        const val = searchParams.get(key)
        return val ? val.split(',') : []
    }

    const [tempFilters, setTempFilters] = useState({
        category: getParamArray('category'),
        fabric: getParamArray('fabric'),
        sleeve: getParamArray('sleeve'),
        neck: getParamArray('neck'),
        fitType: getParamArray('fitType'),
        gender: searchParams.get('gender') || (route.includes('/women') ? '2' : '1'),
        size: getParamArray('size'),
        color: getParamArray('color'),
        rating: searchParams.get('rating') || '',
        priceMin: searchParams.get('min') || '',
        priceMax: searchParams.get('max') || '',
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

    const categories = [
        "T-Shirts & Tops",
        "Shirts & Upperwear",
        "Bottomwear",
        "Footwear",
        "Activewear",
        "Basics"
    ]

    //     {
    //   "T-Shirts & Tops": [
    //     "T-Shirts",
    //     "Oversized T-Shirts",
    //     "Super Oversized T-Shirts",
    //     "Oversized Full Sleeve T-Shirts",
    //     "Relaxed Fit T-Shirts"
    //   ],
    //   "Shirts & Upperwear": [
    //     "Shirts",
    //     "Overshirts",
    //     "Oversized Shirts",
    //     "Utility Shirts",
    //     "Relaxed Shirts",
    //     "Textured Shirts",
    //     "Cotton Linen Shirts",
    //     "Holiday Shirts"
    //   ],
    //   "Bottomwear": [
    //     "Jeans",
    //     "Cargo Jeans"
    //   ],
    //   "Footwear": [
    //     "Mid Top Sneakers",
    //     "Low Top Sneakers"
    //   ],
    //   "Activewear": [
    //     "Oversized Jerseys"
    //   ],
    //   "Basics": [
    //     "Vests",
    //     "Easy Fit Vests"
    //   ]
    // }
    const fabrics = ['Viscose', 'Cotton Linen', 'Cotton']
    const sleeves = ['Half Sleeves', 'Full Sleeves']
    const necks = ['Collared']
    const fitTypes = ['Regular Fit', 'Relaxed Fit', 'Oversized']

    const genders = [
        { label: 'Men', value: '1' },
        { label: 'Women', value: '2' }
    ]
    const sizes = ['S', 'M', 'L']
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

    const handleFilterChange = (filterType, value, isSingle = false) => {
        setTempFilters(prev => {
            if (isSingle) {
                return { ...prev, [filterType]: prev[filterType] === value ? '' : value }
            }
            const current = prev[filterType] || []
            const next = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value]
            return { ...prev, [filterType]: next }
        })
    }

    const handlePriceRangeChange = (type, value) => {
        const newValue = value === '' ? '' : parseInt(value) || 0
        setTempFilters(prev => ({
            ...prev,
            [type === 'min' ? 'priceMin' : 'priceMax']: newValue
        }))
    }

    const handleApplyFilters = () => {
        console.log('Applied Filters:', tempFilters)
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(tempFilters).forEach(([key, value]) => {
            const paramKey = key === 'priceMin' ? 'min' : key === 'priceMax' ? 'max' : key
            if (Array.isArray(value)) {
                if (value.length > 0) {
                    params.set(paramKey, value.join(','))
                } else {
                    params.delete(paramKey)
                }
            } else {
                if (value !== '') {
                    params.set(paramKey, value)
                } else {
                    params.delete(paramKey)
                }
            }
        })

        params.set('page', '1')
        router.push(`?${params.toString()}`)
        router.refresh()
        setIsOpen(false)
    }

    const handleClearFilters = () => {
        router.push('?')
        setTempFilters({
            category: [], fabric: [], sleeve: [], neck: [], fitType: [],
            gender: [], size: [], color: [], rating: [],
            priceMin: '', priceMax: '',
        })
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
                                        type="checkbox"
                                        name="category"
                                        value={cat}
                                        checked={tempFilters.category.includes(cat)}
                                        onChange={() => handleFilterChange('category', cat)}
                                        className="w-4 h-4 accent-cyan-600 rounded"
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
                                        checked={tempFilters.fabric.includes(fabric)}
                                        onChange={() => handleFilterChange('fabric', fabric)}
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
                                        checked={tempFilters.sleeve.includes(sleeve)}
                                        onChange={() => handleFilterChange('sleeve', sleeve)}
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
                                        checked={tempFilters.neck.includes(neck)}
                                        onChange={() => handleFilterChange('neck', neck)}
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
                                        checked={tempFilters.fitType.includes(fitType)}
                                        onChange={() => handleFilterChange('fitType', fitType)}
                                        className="w-4 h-4 accent-cyan-600 rounded"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-black">{fitType}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Gender */}
                    {!route.includes('/men') && !route.includes('/women') && (
                        <FilterSection title="Gender">
                            <div className="space-y-2">
                                {genders.map((gender) => (
                                    <label key={gender.value} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={gender.value}
                                            checked={tempFilters.gender === gender.value}
                                            onChange={() => handleFilterChange('gender', gender.value, true)}
                                            className="w-4 h-4 accent-cyan-600 rounded"
                                        />
                                        <span className="text-sm text-gray-700 group-hover:text-black">{gender.label}</span>
                                    </label>
                                ))}
                            </div>
                        </FilterSection>
                    )}

                    {/* Size */}
                    <FilterSection title="Size">
                        <div className="flex flex-wrap gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handleFilterChange('size', size)}
                                    className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${tempFilters.size.includes(size)
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
                                        value={tempFilters.priceMin}
                                        onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                                        className="w-full px-2 py-1 bg-transparent text-center font-semibold text-black focus:outline-none"
                                    />
                                </div>
                                <div className="text-gray-400 px-2">—</div>
                                <div className="text-center flex-1">
                                    <label className="text-xs text-gray-600 block mb-1">Max</label>
                                    <input
                                        type="number"
                                        value={tempFilters.priceMax}
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
                                ₹{Number(tempFilters.priceMin || 0).toLocaleString()} — ₹{Number(tempFilters.priceMax || 5000).toLocaleString()}
                            </div>
                        </div>
                    </FilterSection>

                    {/* Rating */}
                    <FilterSection title="Rating">
                        <div className="space-y-2">
                            {ratings.map((rating) => (
                                <label key={rating.value} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={rating.value}
                                        checked={tempFilters.rating === String(rating.value)}
                                        onChange={() => handleFilterChange('rating', String(rating.value), true)}
                                        className="w-4 h-4 accent-cyan-600 rounded"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-black">{rating.label}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>
                </div>

                {/* Footer - Clear & Apply Filters */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-3">
                    <Button
                        onClick={handleApplyFilters}
                        className="w-full bg-cyan-600 text-white hover:bg-cyan-700"
                    >
                        Apply Filters
                    </Button>
                    <Button
                        onClick={handleClearFilters}
                        variant="outline"
                        className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                        Clear All
                    </Button>
                </div>
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
