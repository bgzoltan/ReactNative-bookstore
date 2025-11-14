import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListingScreen from "../UI/ListingScreen";
import ListingDetailsScreen from "../UI/ListingDetailsScreen";

const Stack = createNativeStackNavigator();

export default function FeedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Listing"
        component={ListingScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ListingDetails"
        component={ListingDetailsScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
