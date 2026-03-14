import Screen from "../../components/Screen";
import { useApi } from "../../hooks/useApi";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ListingList from "./ListingList";

export default function ListingScreen({ navigation }) {
  const { data, error, request: getListings } = useApi("get", "listings");

  useFocusEffect(
    useCallback(() => {
      getListings();
    }, []),
  );

  return (
    <Screen>
      <ListingList listings={data} error={error} navigation={navigation} />
    </Screen>
  );
}
