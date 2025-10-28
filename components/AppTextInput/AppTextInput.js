import { TextInput, View } from "react-native";
import { Icon } from "../Icon.js";
import { defaultStyles } from "../../config/defaultStyles.js";
import colors from "../../config/colors.js";

export function AppTextInput({ icon, ...props }) {
  const {
    name,
    size = 24,
    color = colors.icon.secondary,
    backgroundColor = colors.bg.white,
  } = icon;
  return (
    <View style={defaultStyles.inputBackground}>
      <Icon
        name={name}
        size={size}
        color={color}
        backgroundColor={backgroundColor}
      />
      <TextInput style={defaultStyles.inputText} {...props} />
    </View>
  );
}

export default AppTextInput;
