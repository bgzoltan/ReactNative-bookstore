import { TextInput, View, Text, StyleSheet } from "react-native";
import { Icon } from "../Icon.js";
import colors from "../../config/colors.js";
import { Platform } from "react-native";

export function AppTextInput({ icon, width = "100%", ...props }) {
  const { required } = props;
  return (
    <View style={[styles.container, { width: width }]}>
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
      {/*  If required displaying '*'  */}
      {required && <Text style={styles.requiredStar}>*</Text>}

      {/* Multiline input for text */}
      <TextInput
        placeholderTextColor={colors.text.gray}
        style={[styles.text]}
        multiline={props.secureTextEntry ? false : true}
        numberOfLines={4}
        {...props}
      />
    </View>
  );
}

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "100%",
    borderRadius: 25,
    borderColor: "gray",
    borderWidth: 1,
    padding: 2,
    backgroundColor: colors.bg.primary,
  },
  text: {
    width: "80%",
    paddingLeft: 5,
    color: colors.text.primary,
    backgroundColor: colors.bg.primary,
    fontFamily:
      Platform.OS === "android" ? "MontserratRegular" : "MontserratRegular",
  },
  requiredStar: {
    color: colors.bg.white,
    paddingLeft: 5,
  },
});
