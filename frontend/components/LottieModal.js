import LottieView from "lottie-react-native";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function LottieModal({
  isVisible,
  info = "",
  source,
  handlePress = () => {},
}) {
  return (
    <>
      {isVisible && (
        <View style={styles.container}>
          <TouchableOpacity onPress={handlePress}>
            <LottieView
              source={source}
              autoPlay
              loop
              style={{ width: 120, height: 120 }}
            />
            <Text>{info}</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isVisible && null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "absolute",
    top: 10,
    left: 10,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
