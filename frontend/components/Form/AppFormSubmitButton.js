import AppButton from "../AppButton/AppButton";

export default function AppFormSubmitButton({ children, handleSubmit }) {
  return <AppButton onPress={handleSubmit}>{children}</AppButton>;
}
