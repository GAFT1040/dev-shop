import api from "./api";

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};
