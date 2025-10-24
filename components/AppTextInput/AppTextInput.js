import { TextInput, View, StyleSheet, Platform } from "react-native";
import Screen from "../Screen";
import { Icon } from "../Icon.js";
import colors from "../../config/colors";

export function AppTextInput({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) {
  return (
    <Screen>
      <View style={styles.container}>
        <Icon
          name={icon.name}
          size={icon.size}
          color={icon.color}
          backgroundColor={icon.backgroundColor}
        />
        <TextInput
          style={styles.text}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    gap: 10,
    width: "100%",
    backgroundColor: colors.bg.gray,
    borderRadius: 25,
    borderColor: "gray",
    borderWidth: 1,
  },
  text: {
    color: colors.text.gray,
    borderRadius: 5,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize: 16,
  },
});
