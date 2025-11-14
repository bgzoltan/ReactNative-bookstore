import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthNavigator from "./navigation/AuthNavigator";
import { navigationTheme } from "./navigation/navigationTheme";
import AppNavigator from "./navigation/AppNavigator";

// import { useDeviceOrientation } from "@react-native-community/hooks";
// import LogIn from "./UI/Login";
// import Product from "./UI/Product";
// import Card from "./UI/Card";
// import { AccountScreen } from "./UI/AccountScreen";
// import ListingScreen from "./UI/ListingScreen";
// import { Text } from "react-native";
// import { AppTextInput } from "./components/AppTextInput/AppTextInput";
// import { useState, useEffect } from "react";
// import colors from "./config/colors";
// import AppText from "./components/AppText/AppText";
// import LoginScreen from "./UI/LoginScreen";
// import RegisterScreen from "./UI/RegisterScreen";
// import ListingEditScreen from "./UI/ListingEditScreen";
// import ListItem from "./UI/ListItem";
// import MessageScreen from "./UI/MessageScreen";
// import * as ImagePicker from "expo-image-picker";
// import { Alert } from "react-native";
// import { Camera } from "expo-camera";
// import AppImageInputList from "./components/AppImageInputList";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Screen from "./components/Screen";
// import AppButton from "./components/AppButton/AppButton";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer theme={navigationTheme}>
          {/* <AuthNavigator /> */}
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
