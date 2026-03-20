import AppForm from "../../components/Form/AppForm.js";
import MessageForm from "../Forms/MessageForm.js";
import * as Yup from "yup";
import { useApi } from "../../hooks/useApi.js";
import { useAuth } from "../../context/AuthContext.js";

export default function ContactSeller({
  sellerId,
  book,
  openInfoModal,
  showErrorModal,
}) {
  const initialValues = { message: "" };
  const validationSchema = Yup.object({
    message: Yup.string().max(100).label("Message"),
  });
  const { user } = useAuth();

  const { request: sendMessage } = useApi("post", "messages");

  const onSubmit = async (values, { setErrors }) => {
    const { message } = values;

    const { error } = await sendMessage({
      sender: user._id,
      recipient: sellerId,
      subject: book.title,
      relatedBookId: book._id,
      content: message,
    });

    if (error) {
      //  Check wheter error is formik error or not
      if (error.errors) {
        setErrors(error);
      } else {
        showErrorModal({ message: error.message, isVisible: true });
      }
      return;
    } else {
      // Show success message to the user
      openInfoModal();
    }
  };

  return (
    <AppForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => <MessageForm {...formikProps} />}
    </AppForm>
  );
}
