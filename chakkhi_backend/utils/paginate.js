const paginate = async (model, query = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sort = {},
    projection = {},
    populate = [],
  } = options;

  const skip = (page - 1) * limit;

  try {
    console.log("Query:", query); // Debug query
    console.log("Skip:", skip);
    console.log("Limit:", limit);

    const val = await model.find(query);

    console.log("val", query.latitute, query.longitude);
    // Fetch paginated results
    const results = await model
      .find(query, projection)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate);

    console.log("results", results);

    if (results.length === 0) {
      console.log("No data found for query:", query);
    }

    // Fetch the total document count
    const totalCount = await model.countDocuments(query);

    console.log("Total Count:", totalCount);

    return {
      data: results,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    console.error("Error during pagination:", error);
    throw new Error(`Pagination Error: ${error.message}`);
  }
};

export default paginate;
