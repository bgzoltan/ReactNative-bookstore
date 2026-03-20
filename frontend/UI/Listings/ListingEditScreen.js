import Screen from "../../components/Screen.js";
import ListingEditScreenForm, {
  initialValues,
  validationSchema,
} from "../Forms/ListingEditScreenForm.js";
import AppForm from "../../components/Form/AppForm.js";
import { useApi } from "../../hooks/useApi.js";
import useLocation from "../../hooks/useLocation.js";
import LottieModal from "../../components/LottieModal.js";
import { useProgress } from "../../context/ProgressContext.js";
import ProgressBar from "../../components/ProgressBar.js";
import { useAuth } from "../../context/AuthContext.js";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import ErrorModal from "../../components/ErrorModal.js";

export default function ListingEditScreen({ navigation }) {
  // axios will automatically add multipart/form-data content type header
  const { request: submitListing } = useApi("post", "listings");
  const location = useLocation();
  const { isUploaded, setIsUploaded } = useProgress();
  const [errorModal, setErrorModal] = useState({
    message: "",
    isVisible: false,
  });

  const closeErrorModal = () => {
    setErrorModal({ ...errorModal, isVisible: false });
  };

  // To reset isUploaded when the screen is focused in order no to show the LottieModal
  useFocusEffect(
    useCallback(() => {
      setIsUploaded(false);
    }, []),
  );
  const { user } = useAuth();

  const onSubmit = async (values) => {
    const { title, author, images, description, price, category } = values;

    const formData = new FormData();
    // Append text fields
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("category", category);
    formData.append("userId", user._id);
    formData.append(
      "location",
      JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude,
      }),
    );

    // Append multiple images
    images.forEach((image) => {
      formData.append("images", {
        uri: image.uri,
        name: image.fileName,
        type: "image/jpeg",
      });
    });

    const { error } = await submitListing(formData);

    if (error) {
      setErrorModal({ message: error.message, isVisible: true });
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
              source={require("../../assets/done.json")}
            />
            <ListingEditScreenForm />
          </>
        )}
      </AppForm>
      <ErrorModal errorModal={errorModal} closeErrorModal={closeErrorModal} />
    </Screen>
  );
}
