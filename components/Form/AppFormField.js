import AppTextInput from "../AppTextInput/AppTextInput";
import { useFormikContext } from "formik";
import ErrorMessage from "../ErrorMessage";
import { StyleSheet, View } from "react-native";

export function AppFormField({ inputName, width, ...otherProps }) {
  const { errors, handleChange, setFieldTouched, touched } = useFormikContext();
  return (
    <>
      <AppTextInput
        onChangeText={handleChange(inputName)}
        onBlur={() => setFieldTouched(inputName)}
        width={width}
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
    marginLeft: 15,
    paddingVertical: 1,
  },
});
