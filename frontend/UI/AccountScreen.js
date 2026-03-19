import Screen from "../components/Screen.js";
import { FlatList, StyleSheet, View, Text } from "react-native";
import colors from "../config/colors.js";
import ListItemSeparator from "../components/ListItemSeparator.js";
import MenuItem from "../components/MenuItem.js";
import { routes } from "../navigation/routes.js";
import { useAuth } from "../context/AuthContext.js";
import { useApi } from "../hooks/useApi.js";
import { useEffect, useState } from "react";
import UserDetails from "./Listings/UserDetails.js";
import ErrorModal from "../components/ErrorModal.js";

export function AccountScreen({ navigation }) {
  const { user, auth } = useAuth();

  const {
    data: userDetails,
    error,
    request: getUser,
  } = useApi("get", "users/:id");

  const [errorModal, setErrorModal] = useState({
    message: "",
    isVisible: false,
  });

  const closeErrorModal = () => {
    setErrorModal({ ...errorModal, isVisible: false });
  };

  useEffect(() => {
    getUser(null, { id: user._id });
  }, []);

  useEffect(() => {
    if (error) {
      setErrorModal({ message: error.message, isVisible: true });
    }
  }, [error]);

  const menuItems = [
    {
      name: "My Listings",
      icon: {
        name: "list",
        color: colors.pastelGrey,
        backgroundColor: colors.pastelYellow,
      },
      onPress: () => {
        navigation.navigate(routes.ACCOUNT_LISTING_SCREEN);
      },
    },
    {
      name: "My Messages",
      icon: {
        name: "mail",
        color: colors.pastelGrey,
        backgroundColor: colors.pastelYellow,
      },
      onPress: () => {
        navigation.navigate(routes.MESSAGES);
      },
    },
    {
      name: "Log out",
      icon: {
        name: "logout",
        color: colors.pastelGrey,
        backgroundColor: colors.pastelYellow,
      },
      onPress: async () => {
        await auth.logout();
      },
    },
  ];

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.userDetails}>
          <Text style={styles.userDetailsTitle}>User</Text>
          <UserDetails
            style={{ backgroundColor: colors.pastelPeach }}
            user={userDetails}
          />
        </View>

        <View>
          <ListItemSeparator color={colors.pastelWhite} height={20} />
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
            <ListItemSeparator color={colors.pastelWhite} height={6} />
          }
        />
        <ErrorModal errorModal={errorModal} closeErrorModal={closeErrorModal} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pastelWhite,
    width: "100%",
  },
  menuItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: 80,
    backgroundColor: colors.pastelWhite,
  },
  userDetails: {
    backgroundColor: colors.pastelPeach,
  },
  userDetailsTitle: {
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeight: "600",
    padding: 5,
  },
});

export default AccountScreen;
