import LottieView from "lottie-react-native";
import { View } from "lucide-react-native";

export default function Loading() {
  return (
    <LottieView
      source={require("../assets/loading.json")}
      autoPlay
      loop
      style={{ width: 100, height: 100 }}
    />
  );
}
