import { Image, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useMemo, useRef, useEffect } from "react";
import * as Yup from "yup";
import RegisterScreenForm from "./Forms/RegisterScreenForm.js";
import LottieModal from "../components/LottieModal";
import { useApi } from "../hooks/useApi.js";
import ErrorModal from "../components/ErrorModal.js";
import AppForm from "../components/Form/AppForm.js";
import { defaultStyles } from "../config/defaultStyles";
import { useAuth } from "../context/AuthContext.js";
import { useProgress } from "../context/ProgressContext.js";

export default function RegisterScreen({ navigation }) {
  const initialValuesMemo = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    }),
    [],
  );
  const validationSchema = Yup.object({
    firstName: Yup.string().required().min(3).max(15).label("FirstName"),
    lastName: Yup.string().required().min(3).max(15).label("LastName"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
  });
  const { auth } = useAuth();
  const { isLoading } = useProgress();
  const { request: createUser } = useApi("post", "users");
  const [errorModal, setErrorModal] = useState({
    message: "",
    isVisible: false,
  });

  const closeErrorModal = () => {
    setErrorModal({ ...errorModal, isVisible: false });
  };

  const onSubmit = async (values, formikHelpers) => {
    const { setStatus, setIsSubmitting } = formikHelpers;
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
      // I had a rerendering problem baceuse of  the Register Screen rerendering formik errors reinitilazied and I could not display the backend error on the form as a fromik error. The solution was to use Formik setStatus function ->
      //API responses, Auth failures.
      // Does not clear automatically
      // Can be any object or string
      // Doe not affect isValid automatically

      if (error.errors && Object.keys(error.errors).length > 0) {
        setStatus({ APIerror: error.errors });
        // It is important because setSubmitting as the "busy" toggle for the form. It is a boolean flag in Formik's state (isSubmitting) that tells my app whether an asynchronous operation  is currently in progress
        setIsSubmitting(false);
      } else {
        // Show error to the user
        setErrorModal({
          ...errorModal,
          message: error.message,
          isVisible: true,
        });
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
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
    }
  };

  return (
    <>
      <LottieModal
        isVisible={isLoading}
        source={require("../assets/loading.json")}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          style={defaultStyles.logo}
          source={require("../assets/logo.png")}
        />
        <AppForm
          initialValues={initialValuesMemo}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <RegisterScreenForm />
        </AppForm>
        <ErrorModal errorModal={errorModal} closeErrorModal={closeErrorModal} />
      </KeyboardAvoidingView>
    </>
  );
}
