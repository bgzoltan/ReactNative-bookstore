import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import AppButton from "../components/AppButton/AppButton";

export default function LogIn() {
  const handleLogin = () => {
    console.log("Login Pressed");
  };
  const handleRegister = () => {
    console.log("Register Pressed");
  };
  return (
    <ImageBackground
      source={require("../assets/booksBg.png")}
      resizeMode="contain"
      blurRadius={4}
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/bookstoplogo.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text style={styles.logoText}>The place where you can read</Text>
        </View>
        <View style={styles.mainAreaContainer}></View>
        <AppButton type="primary" onPress={handleLogin}>
          LOGIN
        </AppButton>
        <AppButton type="secondary" onPress={handleRegister}>
          REGISTER
        </AppButton>

        {/* <StatusBar style="light" backgroundColor="black" />; */}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  imageBackground: {
    flex: 1,
  },
  logoContainer: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 10,
    color: "black",
  },
  controllerBoxes: {
    backgroundColor: "#9ec560ff",
    width: 50,
    height: 50,
  },
  mainAreaContainer: {
    marginTop: 5,
    width: "100%",
    flex: 13,
  },
});
