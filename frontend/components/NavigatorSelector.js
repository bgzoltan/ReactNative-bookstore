import { getToken } from "./SecureStorage";
import AppNavigator from "../navigation/AppNavigator";
import AuthNavigator from "../navigation/AuthNavigator";
import { useApi } from "../hooks/useApi";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function NavigatorSelector() {
  const [isSavedToken, setIsSavedToken] = useState(false);
  const { request: getUser } = useApi("get", "users");
  const { auth } = useAuth();
  useEffect(() => {
    const getTheToken = async () => {
      const savedToken = await getToken();
      if (savedToken) {
        const decodedJwt = jwtDecode(savedToken);
        const { _id, exp } = decodedJwt;

        // Check the token expiry  - exp is in seconds
        if (Date.now() > exp * 1000) {
          auth.logout();
          let error = new Error("Your token is expired.");
          error.status = 401;
          throw error;
        } else {
          const userData = await getUser({ id: _id });
          setIsSavedToken(true);
          // Save the user data in context
          auth.reload(userData.data);
        }
      }
    };
    getTheToken();
  }, []);

  return <> {isSavedToken ? <AppNavigator /> : <AuthNavigator />}</>;
}
