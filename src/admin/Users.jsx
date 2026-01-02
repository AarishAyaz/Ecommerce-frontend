import { useEffect, useState } from "react";
import axios from "../axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    axios
      .get("/api/admin/users", {
        headers: {
          Authorization: auth ? `Bearer ${auth.token}` : "",
        },
      })
      .then((res) => {
        // Backend returns ARRAY — set it directly
        setUsers(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error(err.response?.data);
        setError(err.response?.data?.message || "Failed to load users");
        setUsers([]); // NEVER allow non-array
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      {error && (
        <p className="mb-4 text-red-400 font-medium">{error}</p>
      )}

      <table className="w-full bg-slate-900 text-white rounded-xl overflow-hidden">
        <thead className="bg-slate-800">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-center">Admin</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-6 text-center text-slate-400">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="border-t border-slate-700">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-center">
                  {user.isAdmin ? "Admin" : "User"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
