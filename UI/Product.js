import { StyleSheet, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../config/colors";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Product() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.controllersMainContainer}>
        <View style={styles.controllersContainer}>
          <AntDesign name="close-circle" size={24} color="black" />
        </View>

        <View style={styles.controllersContainer}>
          <AntDesign name="delete" size={24} color="black" />
        </View>
      </View>

      <View style={styles.mainAreaContainer}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.white,
    width: "100%",
  },
  controllersMainContainer: {
    flex: 3,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  controllersContainer: {
    backgroundColor: colors.bg.white,
    width: 30,
    height: 30,
    margin: 20,
  },
  mainAreaContainer: {
    marginTop: 5,
    width: "100%",
    backgroundColor: colors.bg.primary,
    flex: 13,
  },
});
