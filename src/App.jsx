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
import EditUser from "./admin/EditUser";
import ForgotPassword from "./Pages/ForgotPassword";
import AdminProducts from "./admin/AdminProducts";
import AddProduct from "./admin/AddProducts";
import EditProduct from "./admin/EditProduct";
import ViewProduct from "./admin/ViewProduct";
import AdminCategories from "./admin/AdminCategories";
import AddCategory from "./admin/AddCategory";
import EditCategory from "./admin/EditCategory";
import CategoryProducts from "./admin/CategoryProducts";
import AdminArticles from "./admin/AdminArticles";
import AddArticle from "./admin/AddArticle";
import EditArticle from "./admin/EditArticle";
import ViewArticle from "./admin/ViewArticle";

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

      <Route
        path="/admin/users/:id/edit"
        element={
          <AdminRoute>
            <EditUser />
          </AdminRoute>
        }
      />
      <Route path="/admin/categories" element={<AdminCategories />} />
      <Route
        path="/admin/categories/add"
        element={
          <AdminRoute>
            <AddCategory />
          </AdminRoute>
        }
      />
      <Route path="/admin/categories/edit/:id" element={<EditCategory />} />
      <Route
        path="/admin/categories/:id/products"
        element={<CategoryProducts />}
      />

      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/products/add" element={<AddProduct />} />
      <Route path="/admin/products/view/:id" element={<ViewProduct />} />
      <Route path="/admin/products/edit/:id" element={<EditProduct />} />

      <Route path="/admin/articles" element={<AdminArticles />} />
      <Route path="/admin/articles/add" element={
        <AdminRoute>
          <AddArticle />
        </AdminRoute>

        } />
      <Route path="/admin/articles/edit/:id" element={    
        <AdminRoute>
          <EditArticle />
        </AdminRoute>} />
      <Route 
      path="/admin/articles/view/:id"
      element={
        <AdminRoute>
          <ViewArticle />
        </AdminRoute>
      }
        />
    </Routes>
  );
}

export default App;
