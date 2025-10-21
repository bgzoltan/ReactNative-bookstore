import { SafeAreaView } from "react-native-safe-area-context";
import UserItem from "./UserItem";
import { StyleSheet, FlatList } from "react-native";
import colors from "../config/colors";
import ItemDeleteAction from "../components/ItemDeleteAction";

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

  const handleDelete = () => {
    console.log("Delete action triggered");
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ flex: 1, width: "100%", height: "auto" }}
        data={users}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => (
          <UserItem
            name={item.name}
            title={item.title}
            image={item.image}
            renderRightActions={() => (
              <ItemDeleteAction handleDelete={handleDelete} />
            )}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.bg.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
