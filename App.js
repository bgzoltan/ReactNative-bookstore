import { useDeviceOrientation } from "@react-native-community/hooks";
import LogIn from "./UI/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Product from "./UI/Product";
import Card from "./UI/Card";
import { AccountScreen } from "./UI/AccountScreen";
import ListingScreen from "./UI/ListingScreen";
import { Text } from "react-native";
import { AppTextInput } from "./components/AppTextInput/AppTextInput";
import { useState } from "react";
import colors from "./config/colors";
import AppText from "./components/AppText/AppText";
import LoginScreen from "./UI/LoginScreen";
import RegisterScreen from "./UI/RegisterScreen";
import ListingEditScreen from "./UI/ListingEditScreen";
import ListItem from "./UI/ListItem";
import MessageScreen from "./UI/MessageScreen";

export default function App() {
  const [value, setValue] = useState("");

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
