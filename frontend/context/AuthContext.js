import { createContext } from "react";
import { saveToken } from "../components/SecureStorage.js";
import { useState, useContext, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const auth = {};

  auth.login = async (token, user) => {
    //  Save the token and the user in context
    setToken(token);
    setUser(user);
    //  Save the token in expo secure storage
    await saveToken(token);
  };

  auth.logout = async () => {
    // Delete the token and the user in context
    setToken("");
    setUser(null);
    // Delete token in expo secure storage
    await saveToken("");
  };

  const value = useMemo(() => ({
    token,
    user,
    auth,
  }));

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
