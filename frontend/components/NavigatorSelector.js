import { useEffect, useState } from "react";
import AppNavigator from "../navigation/AppNavigator";
import AuthNavigator from "../navigation/AuthNavigator";
import { useAuth } from "../context/AuthContext";

export default function NavigatorSelector() {
  const { token, auth } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await auth.reload();
      } catch (err) {
        // token expired or invalid → logout already handled
      } finally {
        setCheckingAuth(false);
      }
    };

    initAuth();
  }, []);

  if (checkingAuth) {
    return null;
  }

  return token ? <AppNavigator /> : <AuthNavigator />;
}
