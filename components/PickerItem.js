import { View, StyleSheet } from "react-native";
import AppText from "./AppText/AppText";
import colors from "../config/colors";

export default function PickerItem({ item }) {
  return (
    <View style={styles.item}>
      <AppText>{item.label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderColor: colors.bg.black,
    borderBottomWidth: 1,
    backgroundColor: colors.bg.gray,
  },
});
