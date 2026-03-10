import Screen from "../components/Screen.js";
import { FlatList, StyleSheet, View } from "react-native";
import colors from "../config/colors.js";
import ListItemSeparator from "../components/ListItemSeparator.js";
import MenuItem from "../components/MenuItem.js";
import { routes } from "../navigation/routes.js";
import { useAuth } from "../context/AuthContext.js";
import { useApi } from "../hooks/useApi.js";
import { useEffect, useState } from "react";
import UserDetails from "./Listings/UserDetails.js";

export function AccountScreen({ navigation }) {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  const { request: getUser } = useApi("get", `users/${user._id}`);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUser();
        setUserDetails(data);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchUser();
  }, []);

  const menuItems = [
    {
      name: "My Listings",
      icon: {
        name: "list",
        color: colors.icon.white,
        backgroundColor: colors.icon.red,
      },
      onPress: () => {
        navigation.navigate(routes.ACCOUNT_LISTING);
      },
    },
    {
      name: "My Messages",
      icon: {
        name: "mail",
        color: colors.icon.white,
        backgroundColor: colors.icon.greenBlue,
      },
      onPress: () => {
        navigation.navigate(routes.MESSAGES);
      },
    },
    {
      name: "Log out",
      icon: {
        name: "logout",
        color: colors.icon.white,
        backgroundColor: colors.icon.yellow,
      },
      onPress: async () => {
        await auth.logout();
      },
    },
  ];

  return (
    <Screen>
      <View style={styles.container}>
        <UserDetails user={userDetails} />
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
              onPress={item.onPress}
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
  menuItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: 80,
    backgroundColor: colors.bg.white,
  },
});

export default AccountScreen;
