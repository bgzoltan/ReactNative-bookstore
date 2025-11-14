import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "./Card";
import ListItem from "./ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";

export default function ListingDetailScreen({ route }) {
  const user = {
    name: "Zoltan Bagdany",
    title: "Software Developer",
    image: require("../assets/icon.jpeg"),
  };
  return (
    <Screen>
      <Card item={route.params} />
      <View style={styles.userItem}>
        <ListItem
          name={user.name}
          title={user.title}
          image={user.image}
          renderRightActions={() => {}}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  userItem: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    marginTop: 20,
    backgroundColor: colors.bg.white,
  },
});
