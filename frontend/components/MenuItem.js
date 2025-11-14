import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "./Icon";
import colors from "../config/colors";

export default function MenuItem({ name, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon
        name={icon.name}
        size={icon.size ? icon.size : 24}
        color={icon.color ? icon.color : colors.icon.primary}
        backgroundColor={
          icon.backgroundColor ? icon.backgroundColor : colors.bg.gray
        }
      />
      <Text style={styles.item}>{name}</Text>
      <Icon
        name="chevronRight"
        size={icon.size ? icon.size : 24}
        color={colors.icon.darkGrey}
        backgroundColor={colors.bg.white}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.bg.white,
  },
  item: {
    display: "flex",
    flexGrow: 1,
  },
});
