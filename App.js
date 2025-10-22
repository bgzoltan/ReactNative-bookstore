import { useDeviceOrientation } from "@react-native-community/hooks";
import LogIn from "./UI/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Product from "./UI/Product";
import Card from "./UI/Card";
import { AccountScreen } from "./UI/AccountScreen";
import ListingScreen from "./UI/ListingScreen";

export default function App() {
  const orientation = useDeviceOrientation();

  return (
    //   In the new version SafeAreProvider is needed to use SafeAreView
    <SafeAreaProvider>
      {/* <LogIn />*/}
      {/* <Product /> */}
      <ListingScreen />
    </SafeAreaProvider>
  );
}
