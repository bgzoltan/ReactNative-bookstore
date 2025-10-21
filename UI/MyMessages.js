import { TouchableOpacity, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../config/colors";

export function MyMessages() {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="email" size={28} color="black" />
      </View>
      <Text>My Messages</Text>
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
  iconContainer: {
    backgroundColor: colors.bg.secondary,
    padding: 5,
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyMessages;
