import { View, Text, StyleSheet } from "react-native";
import colors from "../../config/colors";

export function AppText({ children, ...props }) {
  return (
    <View>
      <Text style={styles.text} {...props}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.text.secondary,
    backgroundColor: colors.bg.gray,
  },
});

export default AppText;
