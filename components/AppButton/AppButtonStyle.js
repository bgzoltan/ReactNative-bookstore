import colors from "../../config/colors.js";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.bg.primary,
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    margin: 5,
    borderRadius: 50,
  },

  secondary: {
    backgroundColor: colors.bg.secondary,
  },
  buttonText: {
    color: colors.text.primary,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
