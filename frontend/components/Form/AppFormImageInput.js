import { useFormikContext } from "formik";
import ErrorMessage from "../ErrorMessage";
import { View } from "react-native";
import AppImageInputList from "../AppImageInputList";
import { defaultStyles } from "../../config/defaultStyles";

export default function AppFormImageInput({ inputName, ...otherProps }) {
  const { errors, setFieldTouched, touched } = useFormikContext();
  return (
    <>
      <AppImageInputList
        inputName={inputName}
        onBlur={() => setFieldTouched(inputName)}
        {...otherProps}
      />
      <View style={defaultStyles.errorContainer}>
        {touched[inputName] && <ErrorMessage error={errors[inputName]} />}
      </View>
    </>
  );
}
