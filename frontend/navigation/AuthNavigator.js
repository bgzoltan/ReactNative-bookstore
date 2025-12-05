import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../UI/LoginScreen";
import RegisterScreen from "../UI/RegisterScreen";
import WelcomeScreen from "../UI/WelcomeScreen";
import Screen from "../components/Screen";
import LoginNavigator from "./LoginNavigator";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Screen>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginNavigator} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </Screen>
  );
}
