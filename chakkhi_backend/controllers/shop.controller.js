import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import paginate from "../utils/paginate.js";

export const getFilteredShops = async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      maxDistance = 10, // Default to 10 km
      category,
      ratings,
      page,
      limit,
    } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Location is required" });
    }

    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);
    const maxDistanceInKm = parseFloat(maxDistance) || 10; // Ensure it's a number
    const maxDistanceInRadians = maxDistanceInKm / 6371; // Convert to radians

    // Construct the query
    const query = {
      // location: {
      //   $geoWithin: {
      //     $centerSphere: [
      //       [parsedLongitude, parsedLatitude], // Ensure longitude, latitude order
      //       maxDistanceInRadians,
      //     ],
      //   },
      // },
      // category, // Only add if category exists
      category,
      // ...(ratings && { ratings: { $gte: Number(ratings) } }), // Ensure ratings is a number
    };

    // Pagination options
    const options = {
      page,
      limit,
      sort: { ratings: -1 }, // Sorting by ratings in descending order
    };

    // Paginate and fetch shops
    const paginatedShops = await paginate(Shop, query, options);

    res.status(200).json({
      message: "Shops retrieved successfully",
      ...paginatedShops,
    });
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const { status, page, limit } = req.query;

    const query = {};
    if (status) query.status = status;

    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
    };

    const paginatedOrders = await paginate(Order, query, options);

    res
      .status(200)
      .json({ message: "Orders retrieved successfully", ...paginatedOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
