import Screen from "../components/Screen";
import { useApi } from "../hooks/useApi";
import ListingList from "./Listings/ListingList";
import { useEffect } from "react";

export default function AccountListingScreen({ navigation }) {
  const { data, error, request: getMyListings } = useApi("get", "me/listings");

  useEffect(() => {
    getMyListings();
  }, []);

  return (
    <Screen>
      <ListingList listings={data} error={error} navigation={navigation} />
    </Screen>
  );
}
