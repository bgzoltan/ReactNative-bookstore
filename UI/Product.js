import { StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Product() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuContainer}>
        <View style={styles.controllerBoxes}></View>

        <View style={styles.controllerBoxes}></View>
      </View>

      <View style={styles.mainAreaContainer}></View>

      <View style={[styles.button1, styles.buttonContainer]}></View>

      <View style={[styles.button2, styles.buttonContainer]}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3eaed1ff",
    width: "100%",
  },
  menuContainer: {
    flex: 3,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  controllerBoxes: {
    backgroundColor: "#9ec560ff",
    width: 30,
    height: 30,
    margin: 20,
  },
  mainAreaContainer: {
    marginTop: 5,
    width: "100%",
    backgroundColor: "#aa0c46ff",
    flex: 13,
  },
  textContainer: {
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
    backgroundColor: "black",
  },
  button2: {
    backgroundColor: "black",
  },
});
