import colors from "../../config/colors.js";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.bg.primary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 50,
    width: "100%",
    height: 50,
    marginBottom: 5,
    opacity: 0.9,
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
