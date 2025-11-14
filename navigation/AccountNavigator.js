import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../UI/AccountScreen";
import AccountListingScreen from "../UI/AccountListingScreen";
import MessageScreen from "../UI/MessageScreen";

const Stack = createNativeStackNavigator();

export default function AccountNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="AccountListing"
        component={AccountListingScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Messages"
        component={MessageScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
