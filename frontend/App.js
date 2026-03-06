// I had to install  Cocoapods , which is an IOS library manager as npm in order to build and run the Expo app as a real native iOS app. It’s the bridge between JavaScript/Expo and Xcode/iOS

//  I had to do several steps in Xcode to build my app and install it on my physical device. The main issue was to get the right Signing Team (Apple Developer  Program account) and Provisioning Profile.
// After that, I could build and run the app on my iPhone.

import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { navigationTheme } from "./navigation/navigationTheme";
import { ProgressProvider } from "./context/ProgressContext";
import NetworkInfo from "./components/NetworkInfo";
import { AuthProvider } from "./context/AuthContext";
import NavigatorSelector from "./components/NavigatorSelector";
import { useFonts } from "expo-font";
import { View, Text } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    console.log("Fonts are not loaded!!!");
    return null;
  }

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
