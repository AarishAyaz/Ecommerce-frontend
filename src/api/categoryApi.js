// BEFORE
// import axios from "axios";

// AFTER
import axios from "../axios"; // <- use the instance with token interceptor

export const fetchCategories = () => axios.get("/api/categories");

export const createCategory = (data) => axios.post("/api/categories", data);

export const fetchCategoryById = (id) => axios.get(`/api/categories/${id}`);

export const updateCategory = (id, data) => axios.put(`/api/categories/${id}`, data);

export const deleteCategory = (id) => axios.delete(`/api/categories/${id}`);
