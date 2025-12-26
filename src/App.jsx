import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
          <Route path="/profile" element={<Profile />} />

      </Routes>
  );
}

export default App;
