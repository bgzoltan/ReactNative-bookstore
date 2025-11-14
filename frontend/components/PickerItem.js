import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText/AppText";
import colors from "../config/colors";

export default function PickerItem({ item, onSelectItem }) {
  return (
    <TouchableOpacity onPress={onSelectItem}>
      <AppText style={[styles.text]}>{item.label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 10,
    borderBottomColor: colors.bg.border,
    borderTopColor: colors.bg.border,
  },
});
