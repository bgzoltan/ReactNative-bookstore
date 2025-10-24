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

export default function App() {
  const orientation = useDeviceOrientation();
  const [value, setValue] = useState("");

  const onChangeTextHandler = (text) => {
    setValue(text);
  };
  return (
    //   In the new version SafeAreProvider is needed to use SafeAreView
    <SafeAreaProvider>
      {/* <LogIn />*/}
      {/* <Product /> */}
      {/* <ListingScreen /> */}

      <AppTextInput
        icon={{
          name: "email",
          size: 25,
          color: colors.icon.secondary,
          backgroundColor: colors.icon.gray,
        }}
        placeholder="Type your e-mail"
        value={value}
        onChangeText={(text) => onChangeTextHandler(text)}
      />
    </SafeAreaProvider>
  );
}
