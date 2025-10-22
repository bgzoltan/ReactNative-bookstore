import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "./Icon";
import colors from "../config/colors";

export default function MenuItem({ name, icon }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Icon name={icon.name} size={icon.size} color={icon.backgroundColor} />
      <Text>{name}</Text>
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
});
