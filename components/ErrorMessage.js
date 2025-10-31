import AppText from "./AppText/AppText";
import { StyleSheet } from "react-native";
import colors from "../config/colors";

export default function ErrorMessage({ error }) {
  if (!error) return null;
  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: { color: colors.bg.danger, backgroundColor: colors.bg.white },
});
