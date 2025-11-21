import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

export default function Loading() {
  return (
    <View style={style.container}>
      <LottieView
        source={require("../assets/loading.json")}
        autoPlay
        loop
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
