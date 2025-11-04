import { StyleSheet, FlatList, View } from "react-native";
import colors from "../config/colors";
import ItemDeleteAction from "../components/ItemDeleteAction";
import Screen from "../components/Screen";
import ListItem from "./ListItem";

import { useState } from "react";
import ListItemSeparator from "../components/ListItemSeparator";
import { Icon } from "../components/Icon";

export default function MessageScreen() {
  const initialMessages = [
    {
      id: "1",
      name: "Zoltan Bagdany",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: colors.bg.white,
        }}
        data={messages}
        keyExtractor={(message) => message.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <ListItem
              name={item.name}
              title={item.title}
              image={item.image}
              renderRightActions={() => (
                <ItemDeleteAction handleDelete={() => handleDelete(item)} />
              )}
            />
            <Icon
              name="chevron-right"
              type="FontAwesome"
              color={colors.icon.secondary}
            />
          </View>
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
  itemRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});
