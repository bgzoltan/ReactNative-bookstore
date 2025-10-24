import { TextInput, View, StyleSheet } from "react-native";
import Screen from "../Screen";
import { Icon } from "../Icon.js";
import { defaultStyles } from "../../config/defaultStyles.js";

export function AppTextInput({ icon, ...props }) {
  return (
    <Screen>
      <View style={defaultStyles.inputBackground}>
        <Icon
          name={icon.name}
          size={icon.size}
          color={icon.color}
          backgroundColor={icon.backgroundColor}
        />
        <TextInput style={defaultStyles.inputText} {...props} />
      </View>
    </Screen>
  );
}

export default AppTextInput;
