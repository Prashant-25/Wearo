import { categories } from "@/lib/utils";

export const buildProductPipeline = (filters) => {
    const pipeline = []

    const must = []
    const filter = []

    // ---------------------------
    // 🔍 SEARCH (FUZZY)
    // ---------------------------
    if (filters.search) {
        pipeline.push({
            $search: {
                index: "default",
                compound: {
                    should: [
                        {
                            text: {
                                query: filters.search,
                                path: "product",
                                fuzzy: { maxEdits: 1 },
                                score: {
                                    boost: { value: 8 }
                                }
                            }
                        },
                        {
                            text: {
                                query: filters.search,
                                path: "tags",
                                fuzzy: { maxEdits: 1 },
                                score: {
                                    boost: { value: 5 }
                                }
                            }
                        },
                        {
                            text: {
                                query: filters.search,
                                path: "category",
                                score: {
                                    boost: { value: 3 }
                                }
                            }
                        },
                        {
                            text: {
                                query: filters.search,
                                path: "artist_slug",
                                score: {
                                    boost: { value: 2 }
                                }
                            }
                        }
                    ],
                    minimumShouldMatch: 1,
                    filter
                }
            }
        });

        pipeline.push({
            $addFields: {
                score: { $meta: "searchScore" }
            }
        });
    }

    // ---------------------------
    // 🧱 FILTERS (INSIDE SEARCH)
    // ---------------------------
    if (filters.category) {
        const selectedCategories = filters.category.split(',');
        const queryValues = selectedCategories.flatMap(cat => categories[cat] || [cat]);

        filter.push({
            in: {
                path: "category",
                value: queryValues
            }
        })
    }

    if (filters.gender) {
        const genderValues = filters.gender.split(',').map(v => Number(v)).filter(v => !isNaN(v));

        if (genderValues.length > 0) {
            filter.push({
                in: {
                    path: "gender_type",
                    value: genderValues
                }
            })
        }
    }

    if (filters.priceMin || filters.priceMax) {
        const range = { path: "price" }

        if (filters.priceMin) range.gte = Number(filters.priceMin)
        if (filters.priceMax) range.lte = Number(filters.priceMax)

        filter.push({ range })
    }

    if (filters.rating) {
        const ratingValues = filters.rating.split(',').map(Number);
        const minRating = Math.min(...ratingValues);

        filter.push({
            range: {
                path: "avg_rating",
                gte: minRating
            }
        })
    }

    if (filters.color) {
        filter.push({
            text: {
                query: filters.color.split(','),
                path: "colors.color_name"
            }
        })
    }

    if (filters.fabric && filters.fabric.length > 0) {
        filter.push({
            in: {
                value: filters.fabric.split(','),
                path: "attributes.fabric"
            }
        })
    }

    if (filters.sleeve && filters.sleeve.length > 0) {
        filter.push({
            in: {
                value: filters.sleeve.split(','),
                path: "attributes.sleeve"
            }
        })
    }

    if (filters.neck) {
        filter.push({
            in: {
                value: filters.neck.split(','),
                path: "attributes.neck"
            }
        })
    }

    if (filters.fitType && filters.fitType.length > 0) {
        filter.push({
            in: {
                value: filters.fitType.split(','),
                path: "attributes.fitType"
            }
        })
    }

    if (filters.tags?.length) {
        filter.push({
            text: {
                query: filters.tags,
                path: "tags"
            }
        })
    }

    // ---------------------------
    // 🚀 SEARCH STAGE
    // ---------------------------
    if (must.length || filter.length) {
        pipeline.push({
            $search: {
                index: "default",
                compound: {
                    ...(must.length && { must }),
                    ...(filter.length && { filter })
                }
            }
        })

        // add score only if search is used
        if (filters.search) {
            pipeline.push({
                $addFields: {
                    score: { $meta: "searchScore" }
                }
            })
        }
    }

    // ---------------------------
    // 📏 SIZE FILTER (OUTSIDE)
    // ---------------------------
    if (filters.size) {
        const sizeArray = filters.size.split(',');
        pipeline.push({
            $match: {
                sizes: {
                    $elemMatch: {
                        size: { $in: sizeArray },
                        stock: { $gt: 0 }
                    }
                }
            }
        })
    }

    // ---------------------------
    // 🔄 SORTING
    // ---------------------------
    let sort = {}

    if (filters.search) {
        sort.score = -1 // relevance first
    }

    switch (filters.sort) {
        case "price_asc":
            sort.price = 1
            break
        case "price_desc":
            sort.price = -1
            break
        case "popular":
            sort.soldCount = -1
            break
        case "rating":
            sort.avg_rating = -1
            break
        case "new":
            sort.createdAt = -1
            break
        default:
            sort.createdAt = -1;
    }

    if (Object.keys(sort).length) {
        pipeline.push({ $sort: sort })
    }

    // ---------------------------
    // 📄 PAGINATION
    // ---------------------------
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 20;
    const skip = (page - 1) * limit;

    pipeline.push({
        $facet: {
            products: [
                { $skip: skip },
                { $limit: limit }
            ],
            totalCount: [
                { $count: "count" }
            ]
        }
    });

    console.log(JSON.stringify(pipeline))
    return pipeline
}