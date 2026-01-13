import { useEffect, useState } from "react";
import AppNavigator from "../navigation/AppNavigator";
import AuthNavigator from "../navigation/AuthNavigator";
import { useAuth } from "../context/AuthContext";

export default function NavigatorSelector() {
  // Check whether user is logged in or not
  const { token, auth } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await auth.reload();
      } catch (err) {
        // token expired or invalid → logout already handled in AuthContext
        console.log("Error when reloading auth:", err);
      } finally {
        setCheckingAuth(false);
      }
    };

    initAuth();
  }, []);

  // Show nothing while checking authentication status
  if (checkingAuth) {
    return null;
  }
  // Navigate the user based on authentication status
  return token ? <AppNavigator /> : <AuthNavigator />;
}
