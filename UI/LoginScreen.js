import AppTextInput from "../components/AppTextInput/AppTextInput";
import Screen from "../components/Screen";
import { Image, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppButton from "../components/AppButton/AppButton";
import { useState } from "react";
import ListItemSeparator from "../components/ListItemSeparator.js";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login pressed", email, password);
  };
  return (
    <Screen>
      <Image
        style={styles.logo}
        source={require("../assets/bookstoplogo.png")}
      />
      <AppTextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={"email=address"}
        textContentType={"emailAddres"}
        value={email}
        onChangeText={(text) => setEmail(text)}
        icon={{
          name: "email",
        }}
      />
      <ListItemSeparator color={colors.bg.white} height={20} />
      <AppTextInput
        autoCapitalize="none"
        autCorrenct={false}
        icon={{
          name: "lock",
        }}
        placeholder={"Password"}
        textContentType={"password"}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <ListItemSeparator color={colors.bg.white} height={60} />
      <AppButton type={"primary"} onPress={handleLogin}>
        LOGIN
      </AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  button: {
    display: "flex",
    width: "100%",
    height: "auto",
  },
});
