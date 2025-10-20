import { StyleSheet, Image, View, Text } from "react-native";
import colors from "../config/colors";

export default function UserItem({ name, title, image }) {
  return (
    <View style={styles.container}>
      <Image style={styles.userImage} source={image} />
      <View style={styles.userDescription}>
        <Text style={{ fontWeight: "600" }}>{name}</Text>
        <Text>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: colors.bg.secondary,
  },
  userDescription: {
    marginLeft: 10,
    flexDirection: "column",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
