import { StyleSheet, View, FlatList } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Card from "./Card";
import ListItemSeparator from "../components/ListItemSeparator";

export default function ListingScreen() {
  const cards = [
    {
      title: "Greeks",
      subTitle: "Mythology",
      imageSource: require("../assets/greek_mythology.jpg"),
    },
    {
      title: "Romans",
      subTitle: "Mythology",
      imageSource: require("../assets/greek_mythology.jpg"),
    },
  ];

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <View style={styles.container}>
        <FlatList
          data={cards}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={item.subTitle}
              imageSource={item.imageSource}
            />
          )}
          ItemSeparatorComponent={
            <ListItemSeparator color={colors.bg.gray} height={15} />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
