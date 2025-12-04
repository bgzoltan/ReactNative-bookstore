import AppButton from "../AppButton/AppButton";

export default function AppFormSubmitButton({ children, type, handleSubmit }) {
  return (
    <AppButton type={type} onPress={handleSubmit}>
      {children}
    </AppButton>
  );
}
