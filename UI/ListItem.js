import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import colors from "../config/colors";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

export default function ListItem({ name, title, image, renderRightActions }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable
        containerStyle={styles.container}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={renderRightActions}
      >
        <TouchableHighlight underlayColor={colors.bg.gray}>
          <View style={styles.container}>
            <Image style={styles.userImage} source={image} />
            <View style={styles.userDescription}>
              <Text style={{ fontWeight: "600" }}>{name}</Text>
              <Text>{title}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: colors.bg.secondary,
    margin: 2,
    borderRadius: 10,
  },
  userDescription: {
    marginLeft: 10,
    flexDirection: "column",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
