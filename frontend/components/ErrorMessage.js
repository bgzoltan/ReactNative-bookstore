import AppText from "./AppText/AppText";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

export default function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <View style={styles.errorContainer}>
      <AppText style={styles.error}>{error}</AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  errorContainer: {
    width: "90%",
    paddingLeft: 15,
    paddingTop: 1,
    backgroundColor: colors.pastelWhite,
  },
  error: {
    color: colors.pastelRed,
    backgroundColor: colors.pastelWhite,
    flexShrink: 1,
  },
});
