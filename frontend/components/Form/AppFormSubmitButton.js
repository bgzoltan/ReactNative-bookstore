import AppButton from "../AppButton/AppButton";
import { useFormikContext } from "formik";

export default function AppFormSubmitButton({ children, type, handleSubmit }) {
  return (
    <AppButton type={type} onPress={handleSubmit}>
      {children}
    </AppButton>
  );
}
