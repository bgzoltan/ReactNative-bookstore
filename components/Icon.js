import { TouchableOpacity, StyleSheet } from "react-native";
import LucideIcons from "../config/icons";
import colors from "../config/colors";

export function Icon({
  name,
  size = 24,
  color = colors.icon.primary,
  backgroundColor = colors.icon.primary,
  handlePress = () => {},
}) {
  const IconComponent = LucideIcons[name];
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.iconContainer, { backgroundColor: backgroundColor }]}
    >
      <IconComponent size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    borderRadius: 25,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
