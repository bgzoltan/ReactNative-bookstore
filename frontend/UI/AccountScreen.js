import ListItem from "./ListItem.js";
import Screen from "../components/Screen.js";
import { FlatList, StyleSheet, View } from "react-native";
import colors from "../config/colors.js";
import ListItemSeparator from "../components/ListItemSeparator.js";
import MenuItem from "../components/MenuItem.js";
import { routes } from "../navigation/routes.js";
import { useAuth } from "../context/AuthContext.js";

export function AccountScreen({ navigation }) {
  const { user } = useAuth();
  // * Later on change it to the uploaded photo
  user.image = require("../assets/icon.jpeg");

  const menuItems = [
    {
      name: "My Listings",
      icon: {
        name: "list",
        color: colors.icon.white,
        backgroundColor: colors.icon.red,
      },
      targetScreen: routes.ACCOUNT_LISTING,
    },
    {
      name: "My Messages",
      icon: {
        name: "mail",
        color: colors.icon.white,
        backgroundColor: colors.icon.greenBlue,
      },
      targetScreen: routes.MESSAGES,
    },
    {
      name: "Log ot",
      icon: {
        name: "logout",
        color: colors.icon.white,
        backgroundColor: colors.icon.yellow,
      },
      targetScreen: "",
    },
  ];

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.userItem}>
          <ListItem
            name={`${user.firstName} ${user.lastName}`}
            title={user.email}
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
            <MenuItem
              name={item.name}
              icon={item.icon}
              onPress={() => {
                navigation.navigate(item.targetScreen);
              }}
            />
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
