import AppFormSubmitButton from "../../components/Form/AppFormSubmitButton.js";
import { AppFormField } from "../../components/Form/AppFormField.js";
import * as Yup from "yup";

export const initialValues = { email: "", password: "" };
export const validationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreenForm() {
  return (
    <>
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
    </>
  );
}
