import AppTextInput from "../components/AppTextInput/AppTextInput";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import { StyleSheet, View } from "react-native";

export function AppFormField({ inputName, ...otherProps }) {
  const { errors, handleChange, setFieldTouched, touched } = useFormikContext();
  return (
    <>
      <AppTextInput
        onChangeText={handleChange(inputName)}
        onBlur={() => setFieldTouched(inputName)}
        {...otherProps}
      />
      <View style={styles.field}>
        {touched[inputName] && <ErrorMessage error={errors[inputName]} />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    height: 30,
    left: 50,
    marginLeft: 5,
    paddingVertical: 1,
  },
});
