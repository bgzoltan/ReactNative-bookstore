import { useFormikContext } from "formik";
import ErrorMessage from "../ErrorMessage";
import { View } from "react-native";
import AppPicker from "../AppPicker/AppPicker";
import { defaultStyles } from "../../config/defaultStyles";

export function AppFormPicker({
  inputName,
  icon,
  items,
  placeHolder,
  width,
  PickerItemComponent,
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
        width={width}
        PickerItemComponent={PickerItemComponent}
        {...otherProps}
      />
      <View style={defaultStyles.errorContainer}>
        {touched[inputName] && <ErrorMessage error={errors[inputName]} />}
      </View>
    </>
  );
}
