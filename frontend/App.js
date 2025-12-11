import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { navigationTheme } from "./navigation/navigationTheme";
import { ProgressProvider } from "./context/ProgressContext";
import NetworkInfo from "./components/NetworkInfo";
import { AuthProvider } from "./context/AuthContext";
import NavigatorSelector from "./components/NavigatorSelector";

// import { useDeviceOrientation } from "@react-native-community/hooks";
// import Product from "./UI/Product";
// import Card from "./UI/Card";

export default function App() {
  return (
    <>
      <NetworkInfo />
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer theme={navigationTheme}>
            <AuthProvider>
              <ProgressProvider>
                <NavigatorSelector />
              </ProgressProvider>
            </AuthProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </>
  );
}
