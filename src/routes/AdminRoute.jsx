import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth || !auth.token) {
    return <Navigate to="/login" replace />;
  }

  if (!auth.user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
