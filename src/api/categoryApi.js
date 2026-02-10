// BEFORE
// import axios from "axios";

// AFTER
import axios from "../axios"; // <- use the instance with token interceptor

export const fetchCategories = () => axios.get("/api/categories");

export const createCategory = (formData) =>
  axios.post("/api/categories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const fetchCategoryById = (id) => axios.get(`/api/categories/${id}`);

export const updateCategory = (id, formData) =>
  axios.put(`/api/categories/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteCategory = (id) => axios.delete(`/api/categories/${id}`);
