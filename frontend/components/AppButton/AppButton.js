import { Text, TouchableOpacity } from "react-native";
import styles from "./AppButtonStyle.js";

export default function AppButton({
  children,
  handlePress,
  type = "primary",
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        styles.primary,
        type === "primary" ? styles.primary : styles.secondary,
      ]}
      onPress={handlePress}
      {...props}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}
