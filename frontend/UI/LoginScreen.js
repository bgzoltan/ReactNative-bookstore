import AppForm from "../components/Form/AppForm.js";
import { defaultStyles } from "../config/defaultStyles";
import { Image, KeyboardAvoidingView, Platform } from "react-native";
import LoginScreenForm, {
  initialValues,
  validationSchema,
} from "./Forms/LoginScreenForm.js";
import Screen from "../components/Screen";
import { useApi } from "../hooks/useApi.js";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const { request: login } = useApi("post", "login");
  const [errorModal, setErrorModal] = useState({
    message: "",
    isVisible: false,
  });

  const closeErrorModal = () => {
    setErrorModal({ ...errorModal, isVisible: false });
  };

  const onSubmit = async (values, { setErrors }) => {
    const { email, password } = values;
    const { data, error } = await login({ email, password });

    if (error) {
      //  *Check wheter error is formik error or not
      if (error && typeof error === "object" && !Array.isArray(error)) {
        setErrors(error);
      } else {
        console.log(error);
        // Show error to the user
        setErrorModal({ ...errorModal, message: error, isVisible: true });
      }
      return;
    }
    navigation.navigate("App Navigator");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <Screen> */}
      <Image
        style={defaultStyles.logo}
        source={require("../assets/booksStopLogo-cutout.png")}
      />
      <AppForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <LoginScreenForm
            errorModal={errorModal}
            closeErrorModal={closeErrorModal}
            {...formikProps}
          />
        )}
      </AppForm>
      {/* </Screen> */}
    </KeyboardAvoidingView>
  );
}
