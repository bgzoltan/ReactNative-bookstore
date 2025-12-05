import AppForm from "../components/Form/AppForm.js";
import { defaultStyles } from "../config/defaultStyles";
import { Image, KeyboardAvoidingView, Platform } from "react-native";
import LoginScreenForm, {
  initialValues,
  validationSchema,
} from "./Forms/LoginScreenForm.js";
import Screen from "../components/Screen";
import { useApi } from "../hooks/useApi.js";

export default function LoginScreen({ navigation }) {
  const { request: login } = useApi("post", "login");

  const onSubmit = async (values, { setErrors }) => {
    const { email, password } = values;
    const { data, error } = await login({ email, password });

    if (error) {
      //  *Check wheter error is formik error or not
      if (error && typeof error === "object" && !Array.isArray(error)) {
        setErrors(error);
      } else {
        console.log(error);
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
        {(formikProps) => <LoginScreenForm {...formikProps} />}
      </AppForm>
      {/* </Screen> */}
    </KeyboardAvoidingView>
  );
}
