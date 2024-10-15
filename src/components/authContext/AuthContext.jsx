import { createContext, useState, useEffect } from "react";

import initializeSocket from "utils/socket";
import initializeAxios from "services/axios.service";
import { getUser } from "helpers/user.helper";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getUser();
    setToken(user?.token || null);
    setIsLoggedIn(!!user?.token);
    setLoading(false);
    initializeSocket(user?._id || null);
    initializeAxios(user?.token || null);
  }, [localStorage.getItem("user")]);

  return (
    <AuthContext.Provider value={{ token, setToken, loading, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
