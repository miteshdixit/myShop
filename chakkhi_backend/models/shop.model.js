import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Shop name is required"],
    trim: true,
    maxlength: [100, "Shop name cannot exceed 100 characters"],
  },
  category: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    default: 4,
    min: [0, "Rating must be at least 0"],
    max: [5, "Rating cannot exceed 5"],
  },
  review: [
    {
      reviewerName: { type: String, trim: true },
      comment: { type: String, trim: true },
      rating: {
        type: Number,
        min: [0, "Rating must be at least 0"],
        max: [5, "Rating cannot exceed 5"],
      },
    },
  ],
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
  contact: {
    type: String,
    match: [/^\d{10}$/, "Contact must be a valid 10-digit number"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: [true, "Location type is required"],
    },
    coordinates: {
      type: [Number],
      required: [true, "Coordinates are required"],
      validate: {
        validator: function (coords) {
          return coords.length === 2; // Ensure [longitude, latitude]
        },
        message:
          "Coordinates must be an array of exactly 2 numbers [longitude, latitude]",
      },
    },
  },
});

// Add a GeoJSON index for efficient geospatial queries
shopSchema.index({ location: "2dsphere" });

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
