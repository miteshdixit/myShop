import { orderValidator } from "../validations/Validation.js";
import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { shop_id } = req.params;

    console.log("req.params:", req.params); // Log entire params object
    console.log(
      "shop_id:",
      req.params.shop_id,
      "Type:",
      typeof req.params.shop_id
    );

    console.log("shop_id", shop_id, "Type", typeof shop_id);

    // Validate the body of the request
    const { error, value } = orderValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const price = 5 * value.weight;

    // Create the order data
    const orderData = { ...value, customerId, price, shop: shop_id };

    // Create the order in the database
    const order = await Order.create(orderData);

    // Send the response
    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllOrderToShop = async (req, res) => {
  try {
    const { shop_id } = req.query;
    console.log("shop", shop_id);
    const orders = await Order.find({ shop: shop_id });

    if (!orders) {
      res.status(404).json({ message: "No Order Found !" });
    }

    res.status(201).json({ message: "orders fetched successfully", orders });
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
};

export const orderStatus = async (req, res) => {
  try {
    const { order_id, status } = req.body;

    if (!order_id || !status) {
      return res
        .status(400)
        .json({ message: "order_id and status are required" });
    }

    const paid = status === "All Done";

    const updatedOrder = await Order.findByIdAndUpdate(
      order_id,
      { status, paid },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    console.log(updatedOrder);

    return res.status(200).json({
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// const updatePaidStatus = async (req, res) => {
//   try {
//     const { order_id } = req.params;

//     // Update the 'paid' and status field of the order
//     const updatedOrder = await Order.findByIdAndUpdate(
//       order_id,
//       { paid: true, status: "All Done" },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Paid status updated successfully", updatedOrder });
//   } catch (error) {
//     console.error("Error updating paid status:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
