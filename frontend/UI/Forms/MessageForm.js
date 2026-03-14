import AppFormSubmitButton from "../../components/Form/AppFormSubmitButton.js";
import { AppFormField } from "../../components/Form/AppFormField.js";
import colors from "../../config/colors.js";
import InfoModal from "../../components/InfoModal.js";

export default function MessageForm({
  buttonText = "SEND",
  infoModal,
  closeInfoModal,
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
        placeholder={"Type here your message..."}
        icon={{
          name: "message",
          color: colors.pastelGrey,
          size: 24,
          backgroundColor: colors.pastelYellow,
        }}
      />
      <InfoModal infoModal={infoModal} closeInfoModal={closeInfoModal} />
      <AppFormSubmitButton type={"primary"} handleSubmit={handleSubmit}>
        {buttonText}
      </AppFormSubmitButton>
    </>
  );
}
