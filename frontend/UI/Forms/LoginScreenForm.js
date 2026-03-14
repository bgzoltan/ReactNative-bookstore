import AppFormSubmitButton from "../../components/Form/AppFormSubmitButton.js";
import { AppFormField } from "../../components/Form/AppFormField.js";
import colors from "../../config/colors.js";

import ErrorModal from "../../components/ErrorModal.js";

export default function LoginScreenForm({
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
        keyboardType={"email-address"}
        textContentType={"emailAddress"}
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
      <ErrorModal errorModal={errorModal} closeErrorModal={closeErrorModal} />
      <AppFormSubmitButton handleSubmit={handleSubmit}>
        LOGIN
      </AppFormSubmitButton>
    </>
  );
}
