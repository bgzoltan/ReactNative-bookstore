import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";

export default function LogIn() {
  return (
    <ImageBackground
      source={require("../assets/booksBg.png")}
      resizeMode="contain"
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
        <View style={[styles.button1, styles.buttonContainer]}>
          <TouchableOpacity>
            <Text style={styles.buttonTextContainer}>Button 1</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.button2, styles.buttonContainer]}>
          <TouchableOpacity>
            <Text style={styles.buttonTextContainer}>Button 2</Text>
          </TouchableOpacity>
        </View>
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

  buttonTextContainer: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
    fontWeight: "600",
  },

  buttonContainer: {
    flex: 2,
    justifyContent: "center",
    width: "100%",
    fontSize: 40,
    cursor: "pointer",
  },
  button1: {
    backgroundColor: "#eb7f7fff",
  },
  button2: {
    backgroundColor: "#9bd7f0ff",
  },
});
