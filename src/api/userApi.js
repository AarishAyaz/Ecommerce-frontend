import axios from "../axios";

export const fetchUsers = () =>
  axios.get("/api/admin/users");

export const fetchUserById = (id) =>
  axios.get(`/api/admin/users/${id}`);

export const updateUser = (id, data) =>
  axios.put(`/api/admin/users/${id}`, data);

export const deleteUser = (id) =>
  axios.delete(`/api/admin/users/${id}`);
