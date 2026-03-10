import LottieModal from "../../components/LottieModal";
import { useProgress } from "../../context/ProgressContext";
import { FlatList } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import ErrorMessage from "../../components/ErrorMessage";
import Card from "../Card";
import ListItemSeparator from "../../components/ListItemSeparator";
import colors from "../../config/colors";
import { routes } from "../../navigation/routes";

export default function ListingList({ data, error, navigation }) {
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
    </>
  );
}
