import AppFormSubmitButton from "../../components/Form/AppFormSubmitButton.js";
import { AppFormField } from "../../components/Form/AppFormField.js";
import colors from "../../config/colors.js";
import { useFormikContext } from "formik";

export default function RegisterScreenForm() {
  const { handleSubmit } = useFormikContext();
  //  formik handleSubmit runs validation and after that runs onSubmit

  return (
    <>
      <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={"default"}
        textContentType={"name"}
        secureTextEntry={false}
        inputName={"firstName"}
        placeholder={"Type in your firstname"}
        icon={{
          name: "user",
          size: 24,
          color: colors.pastelGrey,
          backgroundColor: colors.pastelYellow,
        }}
        required
      />
      <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={"default"}
        textContentType={"name"}
        secureTextEntry={false}
        inputName={"lastName"}
        placeholder={"Type in your lastname"}
        icon={{
          name: "user",
          size: 24,
          color: colors.pastelGrey,
          backgroundColor: colors.pastelYellow,
        }}
        required
      />
      <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={"email-address"}
        textContentType={"emailAddress"}
        secureTextEntry={false}
        inputName={"email"}
        placeholder={"Type in your email"}
        icon={{
          name: "mail",
          size: 24,
          color: colors.pastelGrey,
          backgroundColor: colors.pastelYellow,
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
          size: 24,
          color: colors.pastelGrey,
          backgroundColor: colors.pastelYellow,
        }}
        required
      />
      <AppFormSubmitButton type={"primary"} handleSubmit={handleSubmit}>
        REGISTER
      </AppFormSubmitButton>
    </>
  );
}
