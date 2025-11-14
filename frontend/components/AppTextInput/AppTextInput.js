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
          color={icon.color ? icon.color : colors.icon.secondary}
          backgroundColor={
            icon.backgroundColor ? icon.backgroundColor : colors.bg.gray
          }
        />
      )}
      {required ? (
        <Text style={{ color: colors.bg.danger, paddingLeft: icon ? 0 : 5 }}>
          *
        </Text>
      ) : (
        <></>
      )}
      <TextInput
        placeholderTextColor={colors.text.gray}
        style={[
          defaultStyles.inputText,
          {
            paddingLeft: 8,
            paddingRight: 10,
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
