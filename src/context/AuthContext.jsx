import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.user) {
      setUser(auth.user);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem(
      "auth",
      JSON.stringify({
        token: data.token,
        user: data.user,
      })
    );
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
