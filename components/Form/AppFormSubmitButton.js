import AppButton from "../AppButton/AppButton";
import { useFormikContext } from "formik";

export default function AppFormSubmitButton({ type }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton type={type} onPress={handleSubmit}>
      LOGIN
    </AppButton>
  );
}
