import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText/AppText";
import colors from "../config/colors";
import { Icon } from "./Icon";

export default function CategoryPickerItem({ item, onSelectItem }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelectItem}>
      <Icon
        name={item.icon ? item.icon.name : ""}
        color={item.icon ? item.icon.color : colors.icon.primary}
        backgroundColor={
          item.icon ? item.icon.backgroundColor : colors.icon.backgroundColor
        }
      />
      <AppText style={[styles.text]}>{item.label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: "33.33%",
    height: 80,
  },
  text: {
    padding: 10,
    borderBottomColor: colors.bg.border,
    borderTopColor: colors.bg.border,
    width: "100%",
    textAlign: "center",
  },
});
