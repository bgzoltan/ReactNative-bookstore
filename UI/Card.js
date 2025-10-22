import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

export default function Card({ title, subTitle, imageSource }) {
  return (
    <View style={styles.imageContainer}>
      <View style={styles.imageBackground}>
        <Image
          source={imageSource}
          resizeMode="contain"
          style={{ width: 100, height: 100 }}
        />
      </View>
      <Text style={styles.imageDescription}>
        {title} {subTitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: 300,
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
});
