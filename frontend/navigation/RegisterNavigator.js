import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./AppNavigator";
import RegisterScreen from "../UI/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function RegisterNavigator() {
  return (
    <Stack.Navigator>
      {/*  The register screen*/}
      <Stack.Screen
        name="Register Screen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      {/*  Other subscreens from here*/}
      <Stack.Screen
        name="App Navigator"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
