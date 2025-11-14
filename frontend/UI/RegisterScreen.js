import Screen from "../components/Screen.js";
import RegisterScreenForm, {
  initialValues,
  validationSchema,
} from "./Forms/RegisterScreenForm.js";

import AppForm from "../components/Form/AppForm.js";
import { Image } from "react-native";
import { defaultStyles } from "../config/defaultStyles";

export default function RegisterScreen() {
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
        <RegisterScreenForm />
      </AppForm>
    </Screen>
  );
}
