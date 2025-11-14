import { TouchableOpacity, StyleSheet } from "react-native";
import LucideIcons from "../config/icons";
import colors from "../config/colors";

export default function ImageInputLayout({ handlePress = () => {} }) {
  const IconComponent = LucideIcons["camera"];
  return (
    <TouchableOpacity onPress={handlePress} style={styles.iconContainer}>
      <IconComponent size={36} color={colors.icon.secondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    borderRadius: 10,
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
    backgroundColor: colors.bg.white,
  },
});
