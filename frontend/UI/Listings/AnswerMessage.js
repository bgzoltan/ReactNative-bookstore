import AppForm from "../../components/Form/AppForm.js";
import MessageForm from "../Forms/MessageForm.js";
import * as Yup from "yup";
import { useApi } from "../../hooks/useApi.js";
import { useAuth } from "../../context/AuthContext.js";

export default function AnswerMessage({ item, openInfoModal, showErrorModal }) {
  const initialValues = { message: "" };
  const validationSchema = Yup.object({
    message: Yup.string().max(100).label("Message"),
  });
  const { user } = useAuth();
  const { sender, subject, relatedBookId } = item;

  const { request: sendMessage } = useApi("post", "messages");

  const onSubmit = async (values, { setErrors }) => {
    const { message } = values;

    const { error } = await sendMessage({
      sender: user._id,
      recipient: sender._id,
      subject,
      relatedBookId,
      content: message,
    });

    if (error) {
      // Form(ijk) validation errors from backend

      if (error.errors) {
        setErrors(error.errors);
        return;
      }

      // General API error - show error message
      showErrorModal({
        message: error.message,
        isVisible: true,
      });

      return;
    }
    // Show success message
    openInfoModal();
  };

  return (
    <>
      <AppForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formikProps) => <MessageForm buttonText="SEND" {...formikProps} />}
      </AppForm>
    </>
  );
}
