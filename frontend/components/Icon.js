import { TouchableOpacity, StyleSheet, View } from "react-native";
import LucideIcons from "../config/icons";
import colors from "../config/colors";

export function Icon({
  name,
  size = 24,
  color = colors.icon.primary,
  backgroundColor = colors.icon.primary,
  handlePress,
  style,
}) {
  const IconComponent = LucideIcons[name];

  if (!IconComponent) {
    return null;
  }

  const isHandlePress = typeof handlePress === "function";

  const containerStyle = [
    styles.iconContainer,
    { backgroundColor: backgroundColor },
    style,
  ];

  const iconElement = <IconComponent size={size} color={color} />;

  if (isHandlePress) {
    return (
      <TouchableOpacity onPress={handlePress} style={containerStyle}>
        {iconElement}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{iconElement}</View>;
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
