import { StyleSheet, Image, View, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import AppText from "../components/AppText/AppText";

export default function ListItem({ name, title, image, renderRightActions }) {
  return (
    <GestureHandlerRootView>
      <Swipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={renderRightActions}
      >
        <TouchableHighlight underlayColor={colors.bg.gray}>
          <View style={styles.container}>
            {image && <Image style={styles.userImage} source={image} />}
            <View style={styles.userDescription}>
              <AppText
                style={{ fontWeight: "600", backgroundColor: colors.bg.white }}
              >
                {name}
              </AppText>
              <AppText
                style={{ backgroundColor: colors.bg.white }}
                numberOfLines={5}
              >
                {title && title}
              </AppText>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    color: colors.text.gray,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  userDescription: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
