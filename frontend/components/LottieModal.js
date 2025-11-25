import LottieView from "lottie-react-native";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function LottieModal({
  isVisible,
  text = "",
  source,
  handlePress = () => {},
}) {
  return (
    <>
      {isVisible && (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
          <LottieView
            source={source}
            autoPlay
            loop
            style={{ width: 120, height: 120 }}
          />
          <Text>{text}</Text>
        </TouchableOpacity>
      )}
      {!isVisible && null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
