import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.js";
import sessionConfig from "../config/session.js";
import {
  loginSchema,
  signupSchema,
  ShopSchema,
} from "../validations/Validation.js";
import User from "../models/user.modal.js";
import Shop from "../models/shop.model.js";

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);

    // console.log("value", value);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const existingUser = await User.findOne({ email: value.email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User(value);
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
    });

    logger.info(`New user registered: ${user.email}`);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const ShopCreation = async (req, res) => {
  try {
    const { error, value } = ShopSchema.validate(req.body);
    console.log("value", value);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const shop = new Shop(value);

    console.log("shop", shop);
    await shop.save();

    res.status(201).json({
      message: "Shop registered successfully",
      shop,
    });

    logger.info(`New Shop registered: ${shop.name}`);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: value.email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(value.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    console.log(token);
    res.cookie("token", token, sessionConfig.cookie);
    res.status(200).json({
      user,
      message: "Login successful",
    });

    logger.info(`User logged in: ${user.email}`);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout Controller
export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
