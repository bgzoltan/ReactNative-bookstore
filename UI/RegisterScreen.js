import Screen from "../components/Screen.js";
import { StyleSheet } from "react-native";
import RegisterScreenForm, {
  initialValues,
  validationSchema,
} from "./Forms/RegisterScreenForm.js";

import AppForm from "../components/Form/AppForm.js";

export default function RegisterScreen() {
  const onSubmit = (values) => console.log("Submitted...", values);

  return (
    <Screen>
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

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  button: {
    display: "flex",
    width: "100%",
    height: "auto",
  },
});
