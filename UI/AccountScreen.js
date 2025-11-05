import ListItem from "./ListItem.js";
import Screen from "../components/Screen.js";
import { FlatList, StyleSheet, View } from "react-native";
import colors from "../config/colors.js";
import ListItemSeparator from "../components/ListItemSeparator.js";
import MenuItem from "../components/MenuItem.js";

export function AccountScreen() {
  const user = {
    name: "Zoltan Bagdany",
    title: "Software Developer",
    image: require("../assets/icon.png"),
  };

  const menuItems = [
    {
      name: "My Listings",
      icon: {
        name: "list",
        color: colors.icon.secondary,
      },
    },
    {
      name: "My Messages",
      icon: {
        name: "mail",
        color: colors.icon.secondary,
      },
    },
    {
      name: "Log ot",
      icon: {
        name: "logout",
        color: colors.icon.secondary,
      },
    },
  ];

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.userItem}>
          <ListItem
            name={user.name}
            title={user.title}
            image={user.image}
            renderRightActions={() => {}}
          />
        </View>
        <View>
          <ListItemSeparator color={colors.bg.gray} height={20} />
        </View>

        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <MenuItem name={item.name} icon={item.icon} />
          )}
          ItemSeparatorComponent={
            <ListItemSeparator color={colors.bg.gray} height={2} />
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.white,
    width: "100%",
    height: "100%",
  },
  userItem: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  menuItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: 80,
    backgroundColor: colors.bg.white,
  },
});

export default AccountScreen;
