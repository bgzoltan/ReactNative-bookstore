import AppForm from "../../components/Form/AppForm.js";
import MessageForm from "../Forms/MessageForm.js";
import * as Yup from "yup";
import { useApi } from "../../hooks/useApi.js";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.js";

export default function AnswerMessage({ item }) {
  const initialValues = { message: "" };
  const validationSchema = Yup.object({
    message: Yup.string().max(255).label("Message"),
  });
  const { user } = useAuth();
  const { sender, subject, relatedBookId } = item;

  const [infoModal, setInfoModal] = useState({
    isVisible: false,
    message: "",
  });
  const closeInfoModal = () => {
    setInfoModal({ ...infoModal, isVisible: false, message: "" });
  };

  const { request: sendMessage } = useApi("post", "messages");

  const onSubmit = async (values, { setErrors }) => {
    const { message } = values;

    const { error } = await sendMessage({
      sender: user._id,
      recipient: sender,
      subject,
      relatedBookId,
      content: message,
    });

    if (error) {
      //  Check wheter error is formik error or not
      if (error && typeof error === "object" && !Array.isArray(error)) {
        setErrors(error);
      } else {
        console.log(error);
        // Show error to the user
        setErrorModal({ ...errorModal, message: error, isVisible: true });
      }
      return;
    } else {
      // Show success message to the user
      setInfoModal({
        ...infoModal,
        message: "Message sent successfully!",
        isVisible: true,
      });
    }
  };

  return (
    <AppForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <MessageForm
          buttonText="ANSWER THE MESSAGE"
          infoModal={infoModal}
          closeInfoModal={closeInfoModal}
          {...formikProps}
        />
      )}
    </AppForm>
  );
}
