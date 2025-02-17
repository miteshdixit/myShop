import roleMiddleware from "../middleware/role.middleware.js";
import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import User from "../models/user.modal.js";
import paginate from "../utils/paginate.js";

export const getUserProfile = (req, res) => {
  const user = req.user;
  res.status(200).json({ user });
};

export const getOrderHistory = async (req, res) => {
  try {
    const { id: customerId } = req.user;

    const { page = 1, limit = 10, sort = "-createdAt" } = req.query;

    // Define the query to filter orders by customerId
    const query = { customerId };

    // Options for pagination
    const options = {
      page,
      limit,
      sort,
      projection: {}, // Include only the necessary fields (optional)
      populate: [], // Populate related fields if needed
    };

    // Use the `paginate` function
    const paginatedOrders = await paginate(Order, query, options);

    res.status(200).json({
      success: true,
      ...paginatedOrders,
    });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getShopOfUser = async (req, res) => {
  try {
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Fetch user by user_id
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const shop_id = user.shop;

    const shop = await Shop.findById(shop_id);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found for this user." });
    }

    // Return the shop details
    res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    console.error("Error fetching shop:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the shop.",
    });
  }
};
