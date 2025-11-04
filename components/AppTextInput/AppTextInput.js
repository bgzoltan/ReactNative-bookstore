import { TextInput, View, Text } from "react-native";
import { Icon } from "../Icon.js";
import { defaultStyles } from "../../config/defaultStyles.js";
import colors from "../../config/colors.js";

export function AppTextInput({ icon, width = "100%", ...otherProps }) {
  const { required } = otherProps;
  return (
    <View style={[defaultStyles.inputBackground, { width: width }]}>
      {icon && (
        <Icon
          name={icon.name}
          size={icon.size ? icon.size : 24}
          type={icon.type ? icon.type : "MaterialIcons"}
          color={icon.color ? icon.color : colors.icon.secondary}
          backgroundColor={
            icon.backgroundColor ? icon.backgroundColor : colors.bg.white
          }
        />
      )}
      {required ? (
        <Text style={{ color: colors.bg.danger, paddingLeft: 10 }}>*</Text>
      ) : (
        <></>
      )}
      <TextInput
        style={[
          defaultStyles.inputText,
          {
            paddingLeft: required ? 0 : 10,
            paddingRight: 5,
          },
          { textAlign: otherProps.textAlign },
        ]}
        alwaysBounceVertical
        multiline
        scrollEnabled={false}
        {...otherProps}
      />
    </View>
  );
}

export default AppTextInput;
