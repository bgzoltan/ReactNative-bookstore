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

  const auth = useMemo(
    () => ({
      login: async (token, user) => {
        setToken(token);
        setUser(user);
        await saveToken(token);
      },
      logout: async () => {
        setToken("");
        setUser(null);
        await saveToken("");
      },
      reload: async (user) => {
        setUser(user);
      },
    }),
    []
  );

  const value = useMemo(
    () => ({
      token,
      user,
      auth,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
