import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import UserList from "./UserList";

export default function Card({ title, subTitle, imageSource }) {
  return (
    <SafeAreaView style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <View style={styles.imageBackground}>
          <Image
            source={imageSource}
            resizeMode="contain"
            style={{ width: 100, height: 100 }}
          />
        </View>

        <View style={styles.imageDescription}>
          <Text>
            {title} {subTitle}
          </Text>
        </View>
      </View>

      <View style={styles.cardInformation}>
        <UserList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: colors.bg.white,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.bg.gray,
    padding: 20,
  },
  imageBackground: {
    flex: 4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageDescription: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.bg.secondary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  cardInformation: {
    flex: 2,
    backgroundColor: colors.bg.white,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
