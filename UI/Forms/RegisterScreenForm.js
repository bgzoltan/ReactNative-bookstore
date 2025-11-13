import AppFormSubmitButton from "../../components/Form/AppFormSubmitButton.js";
import { AppFormField } from "../../components/Form/AppFormField.js";
import colors from "../../config/colors.js";
import * as Yup from "yup";

export const initialValues = { name: "", email: "", password: "" };
export const validationSchema = Yup.object({
  name: Yup.string().required().min(5).max(20).label("User"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function RegisterScreenForm() {
  return (
    <>
      <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={"default"}
        textContentType={"name"}
        inputName={"name"}
        placeholder={"Type in your name"}
        icon={{
          name: "user",
          backgroundColor: colors.bg.white,
        }}
        required
      />
      <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={"email-address"}
        textContentType={"emailAddress"}
        inputName={"email"}
        placeholder={"Type in your email"}
        icon={{
          name: "mail",
          backgroundColor: colors.bg.white,
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
          backgroundColor: colors.bg.white,
        }}
        required
      />
      <AppFormSubmitButton type={"primary"}>REGISTER</AppFormSubmitButton>
    </>
  );
}
