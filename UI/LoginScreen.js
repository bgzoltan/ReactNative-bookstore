import Screen from "../components/Screen";
import { Image, StyleSheet } from "react-native";
import LoginScreenForm, {
  initialValues,
  validationSchema,
} from "./Forms/LoginScreenForm.js";

import AppForm from "../components/Form/AppForm.js";

export default function LoginScreen({}) {
  const onSubmit = (values) => console.log("Submitted...", values);

  return (
    <Screen>
      <Image
        style={styles.logo}
        source={require("../assets/bookstoplogo.png")}
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

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
