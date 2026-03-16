import AppTextInput from "../AppTextInput/AppTextInput";
import { useFormikContext } from "formik";
import ErrorMessage from "../ErrorMessage";
import { View } from "react-native";
import { defaultStyles } from "../../config/defaultStyles";

export function AppFormField({ inputName, width, ...props }) {
  {
    /*  Loading formik values and functions*/
  }
  const { errors, setFieldValue, setFieldTouched, touched, values } =
    useFormikContext();
  return (
    <>
      {/*  Input field  */}
      <AppTextInput
        onChangeText={(text) => setFieldValue(inputName, text)}
        value={values[inputName]}
        onBlur={() => setFieldTouched(inputName)}
        width={width}
        {...props}
      />

      {/*  Displaying error messages*/}
      <View style={defaultStyles.errorContainer}>
        {touched[inputName] && <ErrorMessage error={errors[inputName]} />}
      </View>
    </>
  );
}
