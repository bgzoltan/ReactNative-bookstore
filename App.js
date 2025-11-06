import { useDeviceOrientation } from "@react-native-community/hooks";
import LogIn from "./UI/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Product from "./UI/Product";
import Card from "./UI/Card";
import { AccountScreen } from "./UI/AccountScreen";
import ListingScreen from "./UI/ListingScreen";
import { Text } from "react-native";
import { AppTextInput } from "./components/AppTextInput/AppTextInput";
import { useState, useEffect } from "react";
import colors from "./config/colors";
import AppText from "./components/AppText/AppText";
import LoginScreen from "./UI/LoginScreen";
import RegisterScreen from "./UI/RegisterScreen";
import ListingEditScreen from "./UI/ListingEditScreen";
import ListItem from "./UI/ListItem";
import MessageScreen from "./UI/MessageScreen";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { Camera } from "expo-camera";
import AppImageInputList from "./components/AppImageInputList";

export default function App() {
  const [value, setValue] = useState("");

  // const cameraPremisson = async () => {
  //   const { granted } = await ImagePicker.requestCameraPermissionsAsync();

  //   if (!granted) {
  //     Alert.alert("You need to enable permission to access to library.");
  //   }
  // };

  // useEffect(() => {
  //   cameraPremisson();
  // }, []);

  // useEffect(() => {
  //   async function getPermission() {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     console.log("Status", status);
  //     if (status == "denied") {
  //       Alert.alert(
  //         "Permission issue",
  //         "Please enable access to camera in settings."
  //       );
  //     }
  //   }

  //   getPermission();
  // }, []);

  const onChangeTextHandler = (text) => {
    setValue(text);
  };
  return (
    //   In the new version SafeAreProvider is needed to use SafeAreView
    <SafeAreaProvider>
      {/* <AccountScreen /> */}
      {/* <LogIn /> */}
      {/* <Product /> */}
      {/* <ListingScreen /> */}
      {/* <ListItem /> */}
      {/* <AppImageInputList /> */}
      <ListingEditScreen />
      {/* <RegisterScreen /> */}
      {/* <LoginScreen /> */}

      {/* <MessageScreen /> */}

      {/* <AppTextInput
        icon={{
          name: "mail",
          type: "Lucide",
          size: 25,
          color: colors.icon.secondary,
          backgroundColor: colors.icon.gray,
        }}
        placeholder="Email"
        value={value}
        onChangeText={(text) => onChangeTextHandler(text)}
      /> */}
    </SafeAreaProvider>
  );
}
