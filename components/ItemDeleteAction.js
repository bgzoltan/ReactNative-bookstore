import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ItemDeleteAction({ handleDelete }) {
  return (
    <TouchableOpacity style={styles.container} onPress={handleDelete}>
      <AntDesign name="delete" size={24} color="black" />
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
