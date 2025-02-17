import Joi from "joi";

const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid("customer", "shop_owner", "admin")
    .default("customer"),
  shop: Joi.string(),
});

const ShopSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Shop name is required.",
    "string.min": "Shop name must be at least 3 characters long.",
    "string.max": "Shop name cannot exceed 100 characters.",
  }),
  category: Joi.string().trim().max(50).optional().messages({
    "string.max": "Category cannot exceed 50 characters.",
  }),
  rating: Joi.number().min(0).max(5).optional().messages({
    "number.min": "Rating must be at least 0.",
    "number.max": "Rating cannot exceed 5.",
  }),
  review: Joi.array()
    .items(
      Joi.object({
        reviewerName: Joi.string().trim().required().messages({
          "string.empty": "Reviewer name is required.",
        }),
        comment: Joi.string().trim().max(500).optional().messages({
          "string.max": "Review comment cannot exceed 500 characters.",
        }),
        rating: Joi.number().min(0).max(5).optional().messages({
          "number.min": "Review rating must be at least 0.",
          "number.max": "Review rating cannot exceed 5.",
        }),
      })
    )
    .optional(),
  address: Joi.string().trim().min(5).max(200).required().messages({
    "string.empty": "Address is required.",
    "string.min": "Address must be at least 5 characters long.",
    "string.max": "Address cannot exceed 200 characters.",
  }),
  contact: Joi.string()
    .pattern(/^\d{10}$/)
    .optional()
    .messages({
      "string.pattern.base": "Contact must be a valid 10-digit number.",
    }),
  description: Joi.string().trim().max(500).optional().messages({
    "string.max": "Description cannot exceed 500 characters.",
  }),
  isOpen: Joi.boolean().optional(),
  location: Joi.object({
    type: Joi.string().valid("Point").required().messages({
      "any.only": "Location type must be 'Point'.",
      "string.empty": "Location type is required.",
    }),
    coordinates: Joi.array()
      .items(Joi.number().required())
      .length(2)
      .required()
      .messages({
        "array.base": "Coordinates must be an array.",
        "array.length":
          "Coordinates must contain exactly 2 values [longitude, latitude].",
        "number.base": "Each coordinate must be a number.",
      }),
  }).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const orderValidator = Joi.object({
  product: Joi.string().valid("wheat", "corn", "barley", "other").required(),
  weight: Joi.number().required(),
  texture: Joi.string().valid("highly crushed", "medium", "coarse"),
  paid: Joi.boolean(),
  price: Joi.number(),
  status: Joi.string().valid("Processing", "Ready to pick", "All Done"),
  createdAt: Joi.date().default(() => new Date()),
});

export { signupSchema, loginSchema, ShopSchema, orderValidator };
