import { FlatList } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Card from "./Card";
import ListItemSeparator from "../components/ListItemSeparator";
import { routes } from "../navigation/routes";
import axios from "axios";
import { useState } from "react";

export default function ListingScreen({ navigation }) {
  const [data, setData] = useState([]);

  const getListings = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/listings");
      setData(response.data);
      console.log("Response Data:", response.data);
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };

  getListings();

  return (
    <Screen>
      <FlatList
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          return (
            <Card
              title={item.title}
              author={item.author}
              price={item.price}
              imageSource={{
                uri: `http://localhost:8000/assets/${item.images[0].fileName}.webp`,
              }}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          );
        }}
        ItemSeparatorComponent={
          <ListItemSeparator color={colors.bg.gray} height={15} />
        }
      />
    </Screen>
  );
}
