import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import AppText from "./AppText/AppText";
import colors from "../config/colors";
import { Icon } from "./Icon";

export default function CategoryPickerItem({ item, onSelectItem }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSelectItem(item.content)}
    >
      <Icon
        handlePress={() => onSelectItem(item.content)}
        name={item.icon ? item.icon.name : ""}
        color={item.icon ? item.icon.color : colors.icon.primary}
        backgroundColor={
          item.icon ? item.icon.backgroundColor : colors.icon.backgroundColor
        }
      />

      <AppText style={[styles.text]}>{item.content}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    gap: 5,
    height: 80,
  },
  text: {
    fontFamily: "MonteserratRegular",
    fontSize: 14,
    borderBottomColor: colors.bg.border,
    borderTopColor: colors.bg.border,
    width: "100%",
    textAlign: "center",
  },
});
