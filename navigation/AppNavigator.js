import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListingEditScreen from "../UI/ListingEditScreen";
import AccountScreen from "../UI/AccountScreen";
import { Icon } from "../components/Icon";
import colors from "../config/colors";
import FeedNavigator from "./FeedNavigator";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Listing"
        component={FeedNavigator}
        options={tabOption("house", 24, colors.icon.red, colors.bg.white)}
      />
      <Tab.Screen
        name="Edit"
        component={ListingEditScreen}
        options={tabOption(
          "circlePlus",
          32,
          colors.icon.white,
          colors.bg.primary
        )}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={tabOption("user", 28, colors.icon.red, colors.bg.white)}
      />
    </Tab.Navigator>
  );
}

const tabOption = (iconName, size = 24, color, backgroundColor) => ({
  tabBarIcon: ({ focused }) => (
    <Icon
      name={iconName}
      size={size}
      color={focused ? color : colors.icon.darkGrey}
      backgroundColor={focused ? backgroundColor : colors.bg.white}
      style={{
        marginBottom: iconName == "circlePlus" ? 30 : 0,
      }}
    />
  ),
  headerShown: false,
  tabBarActiveTintColor: colors.icon.red,
  tabBarInactiveTintColor: colors.icon.darkGrey,
  tabBarLabelStyle: {
    fontWeight: "600",
  },
});
