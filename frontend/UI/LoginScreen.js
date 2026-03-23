import AppForm from "../components/Form/AppForm.js";
import { defaultStyles } from "../config/defaultStyles";
import { Image, KeyboardAvoidingView, Platform } from "react-native";
import LoginScreenForm from "./Forms/LoginScreenForm.js";
import * as Yup from "yup";
import { useApi } from "../hooks/useApi.js";
import { useState } from "react";
import ErrorModal from "../components/ErrorModal.js";
import { useAuth } from "../context/AuthContext.js";

export default function LoginScreen({ navigation }) {
  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object({
    email: Yup.string().required().label("Email"),
    password: Yup.string().required().label("Password"),
  });
  const { request: login } = useApi("post", "login");
  const { auth } = useAuth();
  const [errorModal, setErrorModal] = useState({
    message: "",
    isVisible: false,
  });

  const showErrorModal = (errorMessage) => {
    setErrorModal(errorMessage);
  };

  const closeErrorModal = () => {
    setErrorModal({ ...errorModal, isVisible: false });
  };
  const onSubmit = async (values, { setErrors }) => {
    const { email, password } = values;
    const { data, error } = await login({ email, password });

    if (error) {
      // Form(ik) validation errors from backend
      if (error.errors) {
        setErrors(error.errors);
        return;
      }
      // General API error
      setErrorModal({
        message: error.message,
        isVisible: true,
      });

      return;
    }

    const { token, user } = data;
    if (!token) {
      setErrorModal({
        ...errorModal,
        message: "Token error.",
        isVisible: true,
      });
      console.log("Error when receiving token.");
      return;
    }
    auth.login(token, user);
    navigation.navigate("App Navigator");
  };
  return (
    //  KeyboardAvoidingView is used to prevent the keyboard from covering the form fields when they are focused.
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? -150 : 100}
    >
      {/* <Screen> */}
      <Image
        style={defaultStyles.logo}
        source={require("../assets/logo.png")}
      />
      <AppForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <LoginScreenForm showErrorModal={showErrorModal} />
      </AppForm>
      <ErrorModal errorModal={errorModal} closeErrorModal={closeErrorModal} />
    </KeyboardAvoidingView>
  );
}
