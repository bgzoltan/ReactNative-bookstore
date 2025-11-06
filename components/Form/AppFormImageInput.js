import { useFormikContext } from "formik";
import ErrorMessage from "../ErrorMessage";
import { StyleSheet, View } from "react-native";
import AppImageInputList from "../AppImageInputList";

export default function AppFormImageInput({ inputName, ...otherProps }) {
  const { errors, setFieldTouched, touched } = useFormikContext();
  return (
    <>
      <AppImageInputList
        inputName={inputName}
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
    marginLeft: 15,
    paddingVertical: 1,
  },
});
