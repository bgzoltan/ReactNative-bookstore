import { FlatList } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Card from "./Card";
import ListItemSeparator from "../components/ListItemSeparator";
import { routes } from "../navigation/routes";
import axios from "axios";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import AppButton from "../components/AppButton/AppButton";
import { ActivityIndicator } from "react-native";

export default function ListingScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const getListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/listings");
      setData(response.data);
      setError(false);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log("Error:", error.response?.data || error.message);
    }
  };
  useEffect(() => {
    getListings();
  }, []);

  return (
    <Screen>
      {error && (
        <>
          <ErrorMessage error="🔴 Error: Could not retrieve the listings. Check you internet connection and try to reload!" />
          <AppButton onPress={getListings}>Retry</AppButton>
        </>
      )}
      <ActivityIndicator animating={loading} size="large" />
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            author={item.author}
            price={item.price}
            images={item.images}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
        ItemSeparatorComponent={
          <ListItemSeparator color={colors.bg.gray} height={15} />
        }
      />
    </Screen>
  );
}
