import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./admin/AminDashboard";
import Users from "./admin/Users";
import AddUser from "./admin/AddUser";
import ForgotPassword from "./Pages/ForgotPassword";
import AdminProducts from "./admin/AdminProducts";
import AddProduct from "./admin/AddProducts";
import EditProduct from "./admin/EditProduct";
import AdminCategories from "./admin/AdminCategories";
import AddCategory from "./admin/AddCategory";
import EditCategory from "./admin/EditCategory";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* User protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* Admin protected routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <Users />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users/add"
        element={
          <AdminRoute>
            <AddUser />
          </AdminRoute>
        }
      />
      <Route path="/admin/categories" element={<AdminCategories />} />
      <Route path="/admin/categories/add" element={
        <AdminRoute>
            <AddCategory />
        </AdminRoute>
      } />
      <Route path="/admin/categories/edit/:id" element={<EditCategory />} />

      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/products/add" element={<AddProduct />} />
      <Route path="/admin/products/edit/:id" element={<EditProduct />} />
    </Routes>
  );
}

export default App;
