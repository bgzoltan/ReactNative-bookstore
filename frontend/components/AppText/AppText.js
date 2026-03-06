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
    color: colors.text.secondary,
  },
});

export default AppText;
