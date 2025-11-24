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
import { React, useState } from "react";

export default function Card({ title, author, price, images, onPress }) {
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
        <Text style={styles.imageDescription}>
          {title}
          {"-"}
          {price}
        </Text>
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
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.bg.white,
    marginBottom: 10,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.bg.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  imageDescription: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.bg.primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
});
