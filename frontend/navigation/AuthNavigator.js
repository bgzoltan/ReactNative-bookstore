import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../UI/WelcomeScreen";
import Screen from "../components/Screen";
import LoginNavigator from "./LoginNavigator";
import RegisterNavigator from "./RegisterNavigator";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Screen>
      <Stack.Navigator>
        {/*  The App main screen*/}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        {/*  Other subscreens from here */}
        <Stack.Screen name="Login" component={LoginNavigator} />
        <Stack.Screen name="Register" component={RegisterNavigator} />
      </Stack.Navigator>
    </Screen>
  );
}
