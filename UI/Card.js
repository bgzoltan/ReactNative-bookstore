import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Card({ title, subTitle, imageSource }) {
  return (
    <SafeAreaView style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <View style={styles.imageBackground}>
          <Image
            source={imageSource}
            resizeMode="contain"
            style={{ width: 150, height: 150 }}
          />
        </View>

        <View style={styles.imageDescription}>
          <Text>
            {title} {subTitle}
          </Text>
        </View>
      </View>

      <View style={styles.cardInformation}>
        <Text>Information</Text>
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
    flex: 2,
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
    flex: 3,
    backgroundColor: colors.bg.primary,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
