import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { Icon } from "./Icon";

export default function ItemDeleteAction({ handleDelete }) {
  return (
    <TouchableOpacity style={styles.container} onPress={handleDelete}>
      <Icon
        name="bin"
        color={colors.icon.primary}
        backgroundColor={colors.bg.danger}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: 70,
    padding: 10,
    justifyContent: "row",
    backgroundColor: colors.bg.danger,
    alignItems: "center",
    justifyContent: "center",
  },
});
