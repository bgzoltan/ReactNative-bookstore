import AppFormSubmitButton from "../../components/Form/AppFormSubmitButton.js";
import { AppFormField } from "../../components/Form/AppFormField.js";
import colors from "../../config/colors.js";

import ErrorModal from "../../components/ErrorModal.js";

export default function RegisterScreenForm({
  errorModal,
  closeErrorModal,
  ...formikProps
}) {
  const { handleSubmit } = formikProps;
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
          backgroundColor: colors.bg.white,
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
          backgroundColor: colors.bg.white,
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
      <ErrorModal errorModal={errorModal} closeErrorModal={closeErrorModal} />
      <AppFormSubmitButton type={"primary"} handleSubmit={handleSubmit}>
        REGISTER
      </AppFormSubmitButton>
    </>
  );
}
