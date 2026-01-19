import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Image } from "react-native";
import ListItem from "./ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";
import LottieModal from "../components/LottieModal";

export default function ListingDetailScreen({ route }) {
  const user = {
    name: "Zoltan Bagdany",
    title: "Software Developer",
    image: require("../assets/icon.jpeg"),
  };

  const [isLoading, setIsLoading] = useState(false);

  const item = route.params;
  const { title, author, description, price, images } = item;

  // Handle case where there are no images
  if (!images || images.length === 0) {
    return (
      <Screen>
        <Text>No images available for this listing.</Text>
      </Screen>
    );
  }
  const numberOfImages = images.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator
      >
        <TouchableOpacity
          onPress={() => {
            // Cycle through images on each tap
            setCurrentIndex((currentIndex + 1) % numberOfImages);
          }}
          style={{ height: "70%" }}
        >
          <Text>Tap the image to see next image</Text>
          <LottieModal
            isVisible={isLoading}
            source={require("../assets/loading.json")}
          />
          <Image
            source={{
              uri: `${images[currentIndex].uri}`,
            }}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            resizeMode=""
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text>Title: {title}</Text>
          <Text>Author: {author}</Text>
          <Text>Description: {description}</Text>
          <Text style={styles.price}>Price: AUD$ {price}</Text>
        </View>
        <View style={styles.userItem}>
          <ListItem
            name={user.name}
            title={user.title}
            image={user.image}
            renderRightActions={() => {}}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  userItem: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.bg.white,
  },
  image: {
    height: "100%",
    width: "auto",
  },
  detailsContainer: {
    padding: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: "500",
  },
});
