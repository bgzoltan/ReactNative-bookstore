import { TextInput, View, Text } from "react-native";
import { Icon } from "../Icon.js";
import { defaultStyles } from "../../config/defaultStyles.js";
import colors from "../../config/colors.js";

export function AppTextInput({ icon, ...otherProps }) {
  const {
    name,
    size = 24,
    type = "MaterialIcons",
    color = colors.icon.secondary,
    backgroundColor = colors.bg.white,
  } = icon;
  const { required } = otherProps;
  return (
    <View style={defaultStyles.inputBackground}>
      <Icon
        name={name}
        size={size}
        type={type}
        color={color}
        backgroundColor={backgroundColor}
      />
      {required ? <Text style={{ color: colors.bg.danger }}>*</Text> : <></>}
      <TextInput style={defaultStyles.inputText} {...otherProps} />
    </View>
  );
}

export default AppTextInput;
