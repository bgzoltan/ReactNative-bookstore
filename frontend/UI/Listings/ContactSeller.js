import AppForm from "../../components/Form/AppForm.js";
import MessageForm from "../Forms/MessageForm.js";
import * as Yup from "yup";
import { useApi } from "../../hooks/useApi.js";
import { useState } from "react";

export default function ContactSeller({ sellerId }) {
  const initialValues = { message: "" };
  const validationSchema = Yup.object({
    message: Yup.string().max(255).label("Message"),
  });

  const [errorModal, setErrorModal] = useState({
    isVisible: false,
    message: "",
  });
  const closeErrorModal = () => {
    setErrorModal({ ...errorModal, isVisible: false, message: "" });
  };

  const { request: sendMessage } = useApi("post", "messages");

  const onSubmit = async (values, { setErrors }) => {
    const { message } = values;
    console.log("Submitting message:", {
      recipientId: sellerId,
      content: message,
    });

    const { data, error } = await sendMessage({
      recipientId: sellerId,
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
      setErrorModal({
        ...errorModal,
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
          errorModal={errorModal}
          closeErrorModal={closeErrorModal}
          {...formikProps}
        />
      )}
    </AppForm>
  );
}
