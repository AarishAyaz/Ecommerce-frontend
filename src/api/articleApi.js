import axios from "../axios";

export const fetchArticles = () =>
  axios.get("/api/articles");

export const fetchArticleById = (id) =>
  axios.get(`/api/articles/${id}`);

export const createArticle = (data) =>
  axios.post("/api/articles", data);

export const updateArticle = (id, data) =>
  axios.put(`/api/articles/${id}`, data);

export const deleteArticle = (id) =>
  axios.delete(`/api/articles/${id}`);
