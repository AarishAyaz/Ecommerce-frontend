import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchUserById, updateUser } from "../api/userApi";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await fetchUserById(id);
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
      } catch (error) {
        toast.error("Failed to load user", error);
        navigate("/admin/users");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      return toast.error("All fields are required");
    }

    try {
      await updateUser(id, {
        name,
        email,
        isAdmin,
      });

      toast.success("User updated successfully");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-lg text-white">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 bg-slate-800 border border-slate-700 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-slate-800 border border-slate-700 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-black">Admin User</span>
        </label>

        <button
          type="submit"
          className="w-full bg-indigo-600 py-3 rounded font-semibold hover:bg-indigo-700 transition"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
