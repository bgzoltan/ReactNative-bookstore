import { StyleSheet, FlatList } from "react-native";
import colors from "../config/colors";
import ItemDeleteAction from "../components/ItemDeleteAction";
import Screen from "../components/Screen";
import ListItem from "./ListItem";

import { useState } from "react";
import ListItemSeparator from "../components/ListItemSeparator";

export default function MessageScreen() {
  const initialMessages = [
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

  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (item) => {
    setMessages(messages.filter((message) => message.id !== item.id));
  };
  return (
    <Screen>
      <FlatList
        style={{ flex: 1, width: "100%", height: "auto" }}
        data={messages}
        keyExtractor={(message) => message.id}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            title={item.title}
            image={item.image}
            renderRightActions={() => (
              <ItemDeleteAction handleDelete={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={<ListItemSeparator />}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages(initialMessages);
        }}
      />
    </Screen>
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
