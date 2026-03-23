import AppTextInput from "../AppTextInput/AppTextInput";
import { useFormikContext } from "formik";
import ErrorMessage from "../ErrorMessage";
import { View, StyleSheet } from "react-native";

export function AppFormField({ inputName, width, ...props }) {
  {
    /*  Loading formik values and functions*/
  }
  const {
    status,
    setStatus,
    errors,
    setFieldValue,
    setFieldTouched,
    touched,
    values,
  } = useFormikContext();

  // console.log("AppFormField render - inputName:", inputName);
  // console.log("All errors:", errors);
  // console.log("This field error:", errors[inputName]);
  // console.log("This field touched:", touched[inputName]);

  // Show error if field is touched OR if there's a backend error

  // Show error if field is touched OR if there's a backend error
  const shouldShowError = touched[inputName] || !!errors[inputName];
  console.log("Status", status);

  return (
    <>
      {/*  Input field  */}
      <AppTextInput
        onChangeText={(text) => {
          setFieldValue(inputName, text);
          if (status) setStatus(null); // Clear the status error, because it is not cleared automatically by Formik
        }}
        value={values[inputName]}
        onBlur={() => setFieldTouched(inputName, true)}
        width={width}
        {...props}
      />

      {/*  Displaying error messages*/}
      <View style={styles.errorContainer}>
        {shouldShowError && errors[inputName] && (
          <ErrorMessage error={errors[inputName]} />
        )}
        {status && <ErrorMessage error={status.APIerror[inputName]} />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    display: "flex",
    width: "100%",
    height: 35,
  },
});
