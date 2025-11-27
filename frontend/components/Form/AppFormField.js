import AppTextInput from "../AppTextInput/AppTextInput";
import { useFormikContext } from "formik";
import ErrorMessage from "../ErrorMessage";
import { View } from "react-native";
import { defaultStyles } from "../../config/defaultStyles";

export function AppFormField({ inputName, width, ...otherProps }) {
  const { errors, setFieldValue, setFieldTouched, touched, values } =
    useFormikContext();
  return (
    <>
      <AppTextInput
        onChangeText={(text) => setFieldValue(inputName, text)}
        value={values[inputName]}
        onBlur={() => setFieldTouched(inputName)}
        width={width}
        {...otherProps}
      />
      <View style={defaultStyles.errorContainer}>
        {touched[inputName] && <ErrorMessage error={errors[inputName]} />}
      </View>
    </>
  );
}
