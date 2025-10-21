import ListItem from "./ListItem";
import Screen from "../components/Screen.js";
import MyListings from "./MyListings.js";
import MyMessages from "./MyMessages.js";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors.js";
import ListItemSeparator from "../components/ListItemSeparator.js";
import { LogOut } from "./LogOut.js";

export function MyAccount() {
  const user = {
    name: "Zoltan Bagdany",
    title: "Software Developer",
    image: require("../assets/icon.png"),
  };
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.menuItem}>
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
        <View style={styles.menuItem}>
          <MyListings />
        </View>
        <View>
          <ListItemSeparator color={colors.bg.gray} height={5} />
        </View>
        <View style={styles.menuItem}>
          <MyMessages />
        </View>
        <View>
          <ListItemSeparator color={colors.bg.gray} height={5} />
        </View>
        <View style={styles.menuItem}>
          <LogOut />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.gray,
    width: "100%",
    height: "100%",
  },
  menuItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.bg.white,
    // marginBottom: 20,
  },
});
