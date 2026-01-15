import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/admin/users")
      .then((res) => {
        setUsers(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error(err.response?.data);
        setError(err.response?.data?.message || "Failed to load users");
        setUsers([]);
      });
  }, []);

  /* ======================
     DELETE USER
  ====================== */
  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success("User deleted");
    } catch (err) {
      console.error(err.response?.data);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      {error && (
        <p className="mb-4 text-red-400 font-medium">{error}</p>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full bg-slate-900">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center text-slate-400"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-slate-700 hover:bg-slate-800/50 transition"
                >
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 text-center">
                    {user.isAdmin ? (
                      <span className="px-3 py-1 text-xs rounded-full bg-green-600/20 text-green-400">
                        Admin
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                        User
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/users/${user._id}/edit`)
                        }
                        className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition"
                        title="Edit user"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="flex items-center gap-1 text-red-400 hover:text-red-300 transition"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
