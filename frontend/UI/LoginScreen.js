import AppForm from "../components/Form/AppForm.js";
import { defaultStyles } from "../config/defaultStyles";
import { Image } from "react-native";
import LoginScreenForm, {
  initialValues,
  validationSchema,
} from "./Forms/LoginScreenForm.js";
import Screen from "../components/Screen";
import { useApi } from "../hooks/useApi.js";

export default function LoginScreen() {
  const { request: login } = useApi("post", "login");

  const onSubmit = async (values, { setErrors }) => {
    const { email, password } = values;
    const { data, error } = await login({ email, password });

    if (error) {
      // Backend validation errors (structured per field)
      setErrors(error);
    }
    console.log("SUBMIT ==============", data);
  };

  return (
    <Screen>
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
    </Screen>
  );
}
