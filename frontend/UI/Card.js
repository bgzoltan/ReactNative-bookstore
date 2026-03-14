import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from "react-native";
import colors from "../config/colors";
import { FlatList } from "react-native-gesture-handler";

export default function Card({ listing, onPress }) {
  const { images, title } = listing;
  const Wrapper = onPress ? TouchableWithoutFeedback : View;
  return (
    <Wrapper
      onPress={onPress}
      style={[
        styles.imageContainer,
        {
          height: 100,
          width: 100,
        },
      ]}
    >
      <View>
        <ScrollView contentContainerStyle={styles.imageBackground}>
          <FlatList
            data={images}
            keyExtractor={(item) => item.fileName}
            horizontal
            pagingEnabled
            renderItem={({ item }) => (
              <Image
                source={{
                  uri: `${item.uri}`,
                }}
                resizeMode="contain"
                style={{ width: 100, height: 100 }}
              />
            )}
          />
        </ScrollView>
        <Text style={styles.imageTitle}>{title}</Text>
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",

    overflow: "hidden",
    marginBottom: 10,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.pastelPeach,
    backgroundColor: colors.pastelWhite,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  imageTitle: {
    flex: 1,
    width: "100%",
    fontSize: 16,
    fontFamily: "MontserratRegular",
    color: colors.pastelGrey,
    backgroundColor: colors.pastelPeach,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
});
