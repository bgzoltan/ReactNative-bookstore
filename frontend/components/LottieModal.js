import LottieView from "lottie-react-native";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import colors from "../config/colors";

export default function LottieModal({
  isVisible,
  info = "",
  source,
  handlePress = () => {},
}) {
  return (
    <>
      {isVisible && (
        <View>
          <TouchableOpacity onPress={handlePress} style={styles.container}>
            <LottieView source={source} autoPlay loop style={styles.lottie} />
            <Text style={styles.infoText}>{info}</Text>
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
    height: "100%",
    width: "100%",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    height: 120,
    width: 120,
  },
  infoText: {
    fontFamily: "Montserrat",
    fontSize: 16,
    color: colors.pastelGrey,
  },
});
