import { SafeAreaView } from "react-native-safe-area-context";
import UserItem from "./UserItem";
import { StyleSheet, FlatList } from "react-native";
import colors from "../config/colors";

export default function UserList() {
  const users = [
    {
      id: "1",
      name: "Zoltan Bagdany",
      title: "Developer",
      image: require("../assets/icon.png"),
    },
    {
      id: "2",
      name: "John Doe",
      title: "Designer",
      image: require("../assets/icon.png"),
    },
    {
      id: "3",
      name: "Jane Smith",
      title: "Product Manager",
      image: require("../assets/icon.png"),
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ flex: 1, width: "100%", height: "auto" }}
        data={users}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => (
          <UserItem name={item.name} title={item.title} image={item.image} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.bg.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
