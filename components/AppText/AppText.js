import { View, Text, StyleSheet } from "react-native";
import colors from "../../config/colors";

export function AppText({ children, ...otherProps }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, otherProps.style]} {...otherProps}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  text: {
    color: colors.text.secondary,
    backgroundColor: colors.bg.gray,
  },
});

export default AppText;
