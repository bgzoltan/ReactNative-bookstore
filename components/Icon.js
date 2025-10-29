import { TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "../config/colors";

export function Icon({
  name,
  size = 24,
  color = colors.icon.primary,
  type,
  backgroundColor = colors.icon.primary,
  handlePress = () => {},
}) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.iconContainer, { backgroundColor: backgroundColor }]}
    >
      {type == "MaterialIcons" && (
        <MaterialIcons name={name} size={size} color={color} />
      )}
      {type == "FontAwesome" && (
        <FontAwesome name={name} size={size} color={color} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 25,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
