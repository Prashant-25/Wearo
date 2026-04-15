export const buildProductPipeline = (filters) => {
    const pipeline = []

    const must = []
    const filter = []

    // ---------------------------
    // 🔍 SEARCH (FUZZY)
    // ---------------------------
    if (filters.search) {
        must.push({
            text: {
                query: filters.search,
                path: ["product", "tags", "artist_slug", "category"], // ✅ include category
                fuzzy: { maxEdits: 2 }
            }
        })
    }

    // ---------------------------
    // 🧱 FILTERS (INSIDE SEARCH)
    // ---------------------------
    if (filters.category) {
        filter.push({
            text: {
                query: filters.category,
                path: "category"
            }
        })
    }

    if (filters.gender) {
        filter.push({
            equals: {
                path: "gender_type",
                value: Number(filters.gender)
            }
        })
    }

    if (filters.priceMin || filters.priceMax) {
        const range = { path: "price" }

        if (filters.priceMin) range.gte = Number(filters.priceMin)
        if (filters.priceMax) range.lte = Number(filters.priceMax)

        filter.push({ range })
    }

    if (filters.rating) {
        filter.push({
            range: {
                path: "avg_rating",
                gte: Number(filters.rating)
            }
        })
    }

    if (filters.color) {
        filter.push({
            equals: {
                path: "colors.color_name",
                value: filters.color
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
        pipeline.push({
            $match: {
                sizes: {
                    $elemMatch: {
                        size: filters.size,
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
    }

    if (Object.keys(sort).length) {
        pipeline.push({ $sort: sort })
    }

    // ---------------------------
    // 📄 PAGINATION
    // ---------------------------
    const page = Number(filters.page) || 1
    const limit = Number(filters.limit) || 20
    const skip = (page - 1) * limit

    pipeline.push({ $skip: skip })
    pipeline.push({ $limit: limit })
    console.log(JSON.stringify(pipeline))
    return pipeline
}