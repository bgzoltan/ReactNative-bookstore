import AppFormSubmitButton from "../../components/Form/AppFormSubmitButton.js";
import { AppFormField } from "../../components/Form/AppFormField.js";
import colors from "../../config/colors.js";
import ErrorModal from "../../components/ErrorModal.js";

export default function MessageForm({
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
        inputName={"message"}
        placeholder={"Send your message to the seller"}
        icon={{
          name: "message",
          backgroundColor: colors.bg.white,
        }}
      />
      <ErrorModal errorModal={errorModal} closeErrorModal={closeErrorModal} />
      <AppFormSubmitButton type={"primary"} handleSubmit={handleSubmit}>
        SEND MESSAGE
      </AppFormSubmitButton>
    </>
  );
}
