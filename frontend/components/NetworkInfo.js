import { useNetInfo } from "@react-native-community/netinfo";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";
import Constants from "expo-constants";
import { useState, useEffect } from "react";

// Expo Simulator is not supported
export default function NetworkInfo() {
  const [showInfo, setShowInfo] = useState(false);
  const netInfo = useNetInfo();

  useEffect(() => {
    const isOnline = netInfo.isConnected === true && netInfo.type != "uknown";
    setShowInfo(!isOnline);
  }, [netInfo]);

  return (
    <>
      {showInfo && (
        <View style={styles.container}>
          <Text style={styles.infoText}>Internet is NOT connected!</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg.danger,
    width: "100%",
    height: 50,
    top: Constants.statusBarHeight,
    zIndex: 10,
  },
  infoText: {
    color: colors.text.primary,
  },
});
