import { View, Text, StyleSheet } from "react-native";
import colors from "../../config/colors";

export function AppText({ children, ...otherProps }) {
  return (
    <Text style={[styles.text, otherProps.style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.text.secondary,
    backgroundColor: colors.bg.gray,
  },
});

export default AppText;
