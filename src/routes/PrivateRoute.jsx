// frontend/src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  return auth && auth.token ? children : <Navigate to="/login" replace />;
};


export default PrivateRoute;
