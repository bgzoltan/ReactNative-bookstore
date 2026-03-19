import { Text, StyleSheet } from "react-native";
import colors from "../../config/colors";

export function AppText({ children, weight = "regular", style, ...props }) {
  const fontFamily = weight === "bold" ? "MontserratBold" : "MontserratRegular";

  return (
    <Text style={[{ fontFamily }, styles.text, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "MonteserratRegular",
    color: colors.pastelGrey,
  },
});

export default AppText;
