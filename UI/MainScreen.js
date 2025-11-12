import React from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListingScreen from "./ListingScreen";
import ListingEditScreen from "./ListingEditScreen";
import AccountScreen from "./AccountScreen";
import { Icon } from "../components/Icon";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <Screen>
      <Tab.Navigator>
        <Tab.Screen
          name="Feed"
          component={ListingScreen}
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
});

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
  tabBarActiveTintColor: colors.icon.red,
  tabBarInactiveTintColor: colors.icon.darkGrey,
  tabBarLabelStyle: {
    fontWeight: "600",
  },
});
