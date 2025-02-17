// api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;
export const LOGOUT_URL = `${API_URL}/user/auth/logout`;
export const SHOP_CREATE_URL = `${API_URL}/user/auth/shopCreate`;
export const SHOP_SIGNUP_URL = `${API_URL}/user/auth/signup`;
export const PRODUCT_ORDERS_URL = `${API_URL}/product/orders`;
export const ALL_SHOP_URL = `${API_URL}/user/shop`;
export const ORDER_STATUS_URL = `${API_URL}/product/orders/status`;
export const ALL_SHOPS = `${API_URL}/shop/all`;
export const USER_SIGNUP_URL = `${API_URL}/user/auth/signup`;
export const USER_SHOP = `${API_URL}/user/shop`;

export const USER_LOGIN_URL = `${API_URL}/user/auth/login`;
export const ISLOGOUT_URL = `${API_URL}/user/auth/isLogged`;

export const SHOP_PRODUCT_ORDERS_URL = (shop_id) => {
  return `${API_URL}/product/order/${shop_id}`;
};

export const buildUrlWithParams = (endpoint, queryParams) => {
  const query = new URLSearchParams(queryParams).toString();
  return `${API_URL}${endpoint}?${query}`;
};

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;
