import AppButton from "../components/AppButton/AppButton";
import colors from "../config/colors";
import { defaultStyles } from "../config/defaultStyles";
import { ImageBackground } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen({ navigation }) {
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleRegister = () => {
    navigation.navigate("Register");
  };
  return (
    <ImageBackground
      source={require("../assets/booksBackground-cutout.png")}
      resizeMode="fill"
      blurRadius={0}
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={defaultStyles.logo}
            source={require("../assets/booksStopLogo-cutout.png")}
          />
          <Text style={defaultStyles.logoText}>To buy and sell books</Text>
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
    backgroundColor: colors.bg.gray,
  },
  logoContainer: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
