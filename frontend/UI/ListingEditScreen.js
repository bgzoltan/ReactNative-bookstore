import Screen from "../components/Screen.js";
import ListingEditScreenForm, {
  initialValues,
  validationSchema,
} from "./Forms/ListingEditScreenForm.js";

import AppForm from "../components/Form/AppForm.js";
import { useApi } from "../hooks/useApi.js";
import useLocation from "../hooks/useLocation.js";
import LottieModal from "../components/LottieModal.js";
import { useProgress } from "../context/ProgressContext.js";
import ProgressBar from "../components/ProgressBar.js";

export default function ListingEditScreen({ navigation }) {
  const { request: submitListing } = useApi("post", "listings", {
    "Content-Type": "multipart/format-data",
  });
  const location = useLocation();
  const { isUploaded, setIsUploaded } = useProgress();
  const onSubmit = async (values) => {
    const { title, author, images, description, price, category } = values;

    const formData = new FormData();
    // Append text fields
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("category", category);
    formData.append("userId", "6875f9e3f8133e590cf4aa69");
    formData.append(
      "location",
      JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude,
      })
    );

    // Append multiple images
    images.forEach((image, index) => {
      formData.append("images", {
        uri: image.uri,
        name: image.fileName,
        type: "image/jpeg",
      });
    });

    const { data, error } = await submitListing(formData);

    if (error) {
      console.log("LISTING SUBMIT ERROR", error);
      return;
    }
  };
  return (
    <Screen>
      <AppForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ resetForm }) => (
          <>
            <ProgressBar />
            <LottieModal
              isVisible={isUploaded}
              info={"Saved. Tap to continue!"}
              handlePress={() => {
                navigation.navigate("Feed");
                setIsUploaded(false);
                resetForm();
              }}
              source={require("../assets/done.json")}
            />
            <ListingEditScreenForm />
          </>
        )}
      </AppForm>
    </Screen>
  );
}
