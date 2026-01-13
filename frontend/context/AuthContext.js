import { createContext, useState, useMemo, useContext } from "react";
import { saveToken, getToken } from "../components/SecureStorage.js";
import { jwtDecode } from "jwt-decode";
import { apiClient } from "../api/apiClient.js";

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
      // Reload user and token from SecureStorage
      reload: async () => {
        const savedToken = await getToken();

        // Is there a saved token in the SecureSTorage?
        if (savedToken) {
          const decodedJwt = jwtDecode(savedToken);
          // * Get the user id and expiry from the token
          const { _id, exp } = decodedJwt;

          // Check the token expiry  - exp is in seconds
          if (Date.now() > exp * 1000) {
            auth.logout();
            let error = new Error("Your token is expired.");
            error.status = 401;
            throw error;
          } else {
            // Is there a user with the id from the token?
            try {
              const response = await apiClient.get("/users", {
                params: { id: _id },
              });
              setUser(response.data);
              setToken(savedToken);
            } catch (err) {
              console.log("Error when reloading user:", err);
              await auth.logout();
            }
          }
        }
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
