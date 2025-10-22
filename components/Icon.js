import { View, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../config/colors";

export function Icon({ name, size, color }) {
  return (
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <MaterialIcons name={name} size={size} color={colors.icon.primary} />
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
