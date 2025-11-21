import { FlatList } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Card from "./Card";
import ListItemSeparator from "../components/ListItemSeparator";
import { routes } from "../navigation/routes";

import ErrorMessage from "../components/ErrorMessage";
import AppButton from "../components/AppButton/AppButton";
import { useApi } from "../hooks/useApi";
import Loading from "../components/Loading";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function ListingScreen({ navigation }) {
  const {
    data,
    error,
    loading,
    request: getListings,
  } = useApi("get", "listings");

  useFocusEffect(
    useCallback(() => {
      getListings();
    }, [])
  );

  // useEffect(() => {
  //   getListings();
  // }, []);

  return (
    <Screen>
      {error && (
        <>
          <ErrorMessage error="🔴 Error: Could not retrieve the listings. Check you internet connection and try to reload!" />
          <AppButton onPress={getListings}>Retry</AppButton>
        </>
      )}

      {loading && <Loading />}
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
