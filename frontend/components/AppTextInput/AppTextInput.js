import { TextInput, View, Text, StyleSheet } from "react-native";
import { Icon } from "../Icon.js";
import colors from "../../config/colors.js";
import { Platform } from "react-native";

export function AppTextInput({ icon, width = "100%", ...props }) {
  const { required } = props;
  return (
    //  The input consists of ICON, REQUIRED *, INPUT TEXT
    <View style={[styles.inputBackground, { width: width }]}>
      {icon && (
        <Icon
          name={icon.name}
          size={icon.size}
          color={icon.color}
          backgroundColor={icon.backgroundColor}
        />
      )}

      {/*  If required displaying '*'  */}
      {required && <Text style={styles.requiredStar}>*</Text>}

      {/* Multiline input for text */}
      <TextInput
        placeholderTextColor={colors.text.gray}
        style={styles.inputText}
        multiline={props.secureTextEntry ? false : true}
        numberOfLines={4}
        {...props}
      />
    </View>
  );
}

export default AppTextInput;

const styles = StyleSheet.create({
  inputBackground: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "100%",
    borderRadius: 25,
    borderColor: colors.pastelGrey,
    borderWidth: 1,
    padding: 3,
    backgroundColor: colors.pastelYellow,
  },
  inputText: {
    width: "80%",
    paddingLeft: 5,
    color: colors.pastelGrey,
    backgroundColor: colors.pastelYellow,
    fontSize: 16,
    fontFamily:
      Platform.OS === "android" ? "MontserratRegular" : "MontserratRegular",
  },

  requiredStar: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.pastelPink,
  },
});
