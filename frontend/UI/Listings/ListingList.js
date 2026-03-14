import LottieModal from "../../components/LottieModal";
import { useProgress } from "../../context/ProgressContext";
import { FlatList } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import ErrorMessage from "../../components/ErrorMessage";
import Card from "../Card";
import ListItemSeparator from "../../components/ListItemSeparator";
import colors from "../../config/colors";
import { routes } from "../../navigation/routes";

export default function ListingList({ listings, error, navigation }) {
  const { isLoading } = useProgress();
  return (
    <>
      {error && (
        <>
          <ErrorMessage error="🔴 Error: Could not retrieve the listings. Check you internet connection and try to reload!" />
          <AppButton onPress={getListings}>Retry</AppButton>
        </>
      )}
      <LottieModal
        isVisible={isLoading}
        source={require("../../assets/loading.json")}
      />
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing._id}
        renderItem={(listing) => (
          <Card
            listing={listing.item}
            onPress={() =>
              navigation.navigate(routes.LISTING_DETAILS, listing.item)
            }
          />
        )}
        ItemSeparatorComponent={
          <ListItemSeparator color={colors.pastelWhite} height={15} />
        }
      />
    </>
  );
}
