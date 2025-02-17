import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "shop" },
  product: { type: String, enum: ["wheat", "corn", "barley", "other"] },
  weight: { type: Number, required: true },
  texture: { type: String, enum: ["highly crushed", "medium", "coarse"] },
  paid: { type: Boolean, default: false },
  price: { type: Number, required: true },
  status: {
    type: String,
    default: "Processing",
    enum: ["Processing", "Ready to pick", "All Done"],
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
