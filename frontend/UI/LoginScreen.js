import AppForm from "../components/Form/AppForm.js";
import { defaultStyles } from "../config/defaultStyles";
import { Image } from "react-native";
import LoginScreenForm, {
  initialValues,
  validationSchema,
} from "./Forms/LoginScreenForm.js";
import Screen from "../components/Screen";

export default function LoginScreen({}) {
  const onSubmit = (values) => console.log("Submitted...", values);
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
        <LoginScreenForm />
      </AppForm>
    </Screen>
  );
}
