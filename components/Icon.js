import { View, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../config/colors";

export function Icon({
  name,
  size = 26,
  color = colors.icon.primary,
  backgroundColor = colors.icon.primary,
}) {
  return (
    <View style={[styles.iconContainer, { backgroundColor: backgroundColor }]}>
      <MaterialIcons name={name} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
