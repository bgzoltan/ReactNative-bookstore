import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../config/colors";

export default function Screen({ children }) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    // paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    backgroundColor: colors.bg.gray,
  },
});
