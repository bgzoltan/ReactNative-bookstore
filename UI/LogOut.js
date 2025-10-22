import { TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import { Icon } from "../components/Icon";

export function LogOut() {
  return (
    <TouchableOpacity style={styles.container}>
      <Icon name="logout" size={28} color={colors.bg.yellow} />
      <Text>Log out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
});

export default LogOut;
