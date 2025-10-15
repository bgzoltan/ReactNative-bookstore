import { useDeviceOrientation } from "@react-native-community/hooks";
import LogIn from "./UI/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Product from "./UI/Product";

export default function App() {
  const orientation = useDeviceOrientation();
  return (
    //   In the new version SafeAreProvider is needed to use SafeAreView
    <SafeAreaProvider>
      <LogIn></LogIn>
      {/* <Product> </Product>  */}
    </SafeAreaProvider>
  );
}
