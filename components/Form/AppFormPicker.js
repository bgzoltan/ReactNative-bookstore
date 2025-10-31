import { useFormikContext } from "formik";
import ErrorMessage from "../ErrorMessage";
import { StyleSheet, View } from "react-native";
import AppPicker from "../AppPicker/AppPicker";

export function AppFormPicker({
  inputName,
  icon,
  items,
  placeHolder,
  ...otherProps
}) {
  const { errors, handleChange, setFieldTouched, touched } = useFormikContext();
  return (
    <>
      <AppPicker
        inputName={inputName}
        icon={icon}
        items={items}
        placeHolder={placeHolder}
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
