import { FlatList } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Card from "./Card";
import ListItemSeparator from "../components/ListItemSeparator";

export default function ListingScreen({ navigation }) {
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
    <Screen>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Card
            item={item}
            onPress={() => navigation.navigate("ListingDetails", item)}
          />
        )}
        ItemSeparatorComponent={
          <ListItemSeparator color={colors.bg.gray} height={15} />
        }
      />
    </Screen>
  );
}
