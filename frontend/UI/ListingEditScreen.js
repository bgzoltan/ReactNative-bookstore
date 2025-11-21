import Screen from "../components/Screen.js";
import ListingEditScreenForm, {
  initialValues,
  validationSchema,
} from "./Forms/ListingEditScreenForm.js";

import AppForm from "../components/Form/AppForm.js";
import { useApi } from "../hooks/useApi.js";
import useLocation from "../hooks/useLocation.js";

export default function ListingEditScreen({ navigation }) {
  const { request: submitListing } = useApi("post", "listings");
  const location = useLocation();

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      userId: "6875f9e3f8133e590cf4aa69",
    };
    const { data, error } = await submitListing(payload);
    if (error) {
      console.log("LISTING SUBMIT ERROR", error);
      return;
    }
    console.log("LISTING SUBMIT SUCCESS", data);
    navigation.navigate("Feed");
  };

  return (
    <Screen>
      <AppForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <ListingEditScreenForm />
      </AppForm>
    </Screen>
  );
}
