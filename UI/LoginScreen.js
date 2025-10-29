import Screen from "../components/Screen";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";
import { AppFormField } from "../components/AppFormField.js";
import AppForm from "../components/AppForm.js";
import AppFormSubmitButton from "../components/AppFormSubmitButton.js";

const validationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen() {
  return (
    <Screen>
      <Image
        style={styles.logo}
        source={require("../assets/bookstoplogo.png")}
      />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={() => console.log("Submitted.........")}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={"email-address"}
          textContentType={"emailAddress"}
          inputName={"email"}
          placeholder={"Type in your email"}
          icon={{
            name: "email",
          }}
          required
        />
        <AppFormField
          autoCapitalize="none"
          autCorrenct={false}
          placeholder={"Type in your password"}
          textContentType={"password"}
          secureTextEntry
          inputName={"password"}
          icon={{
            name: "lock",
          }}
          required
        />
        <AppFormSubmitButton type={"primary"}>LOGIN</AppFormSubmitButton>
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
