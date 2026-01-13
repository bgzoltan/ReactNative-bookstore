import { Image, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import * as Yup from "yup";
import RegisterScreenForm from "./Forms/RegisterScreenForm.js";
import { useApi } from "../hooks/useApi.js";

import AppForm from "../components/Form/AppForm.js";
import { defaultStyles } from "../config/defaultStyles";
import { useAuth } from "../context/AuthContext.js";

export default function RegisterScreen({ navigation }) {
  const initialValues = { name: "", email: "", password: "" };

  const validationSchema = Yup.object({
    firstName: Yup.string().required().min(3).max(15).label("FirstName"),
    lastName: Yup.string().required().min(3).max(15).label("LastName"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
  });
  const { auth } = useAuth();
  const { request: createUser } = useApi("post", "users");
  const [errorModal, setErrorModal] = useState({
    message: "",
    isVisible: false,
  });

  const closeErrorModal = () => {
    setErrorModal({ ...errorModal, isVisible: false });
  };

  const onSubmit = async (values, { setErrors }) => {
    const { firstName, lastName, email, password } = values;
    // Creating a new user
    const { data, error } = await createUser({
      firstName,
      lastName,
      email,
      password,
    });

    if (error) {
      //  Check if error is formik error or not
      if (error && typeof error === "object" && !Array.isArray(error)) {
        setErrors(error);
      } else {
        console.log(error);
        // Show error to the user
        setErrorModal({ ...errorModal, message: error, isVisible: true });
      }
      return;
    }

    // Successful user creation,  log in the user: get the createdtoken and user data
    const { token, user } = data;
    if (!token) {
      setErrorModal({
        ...errorModal,
        message: "Token error.",
        isVisible: true,
      });
      console.log("Error during creating token for the new user.");
      return;
    }
    auth.login(token, user);
    // Navigate to the main app screen
    navigation.navigate("App Navigator");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={defaultStyles.logo}
        source={require("../assets/booksStopLogo-cutout.png")}
      />
      <AppForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {/* Render props pattern to pass formikProps to RegisterScreenForm */}
        {(formikProps) => (
          <RegisterScreenForm
            errorModal={errorModal}
            closeErrorModal={closeErrorModal}
            {...formikProps}
          />
        )}
      </AppForm>
    </KeyboardAvoidingView>
  );
}
