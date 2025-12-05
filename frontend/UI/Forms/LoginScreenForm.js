import AppFormSubmitButton from "../../components/Form/AppFormSubmitButton.js";
import { AppFormField } from "../../components/Form/AppFormField.js";
import colors from "../../config/colors.js";
import * as Yup from "yup";

export const initialValues = { email: "", password: "" };
export const validationSchema = Yup.object({
  email: Yup.string().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

export default function LoginScreenForm({ handleSubmit }) {
  //  formik handleSubmit runs validation and after that runs onSubmit

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
      <AppFormSubmitButton type={"primary"} handleSubmit={handleSubmit}>
        LOGIN
      </AppFormSubmitButton>
    </>
  );
}
