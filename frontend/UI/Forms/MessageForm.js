import AppFormSubmitButton from "../../components/Form/AppFormSubmitButton.js";
import { AppFormField } from "../../components/Form/AppFormField.js";
import colors from "../../config/colors.js";
import InfoModal from "../../components/InfoModal.js";

export default function MessageForm({
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
        placeholder={"Send your message to the seller"}
        icon={{
          name: "message",
          backgroundColor: colors.bg.white,
        }}
      />
      <InfoModal infoModal={infoModal} closeInfoModal={closeInfoModal} />
      <AppFormSubmitButton type={"primary"} handleSubmit={handleSubmit}>
        SEND MESSAGE
      </AppFormSubmitButton>
    </>
  );
}
