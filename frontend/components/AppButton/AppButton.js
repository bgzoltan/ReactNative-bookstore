import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import colors from "../../config/colors";

export default function AppButton({
  children,
  isActive,
  handlePress,
  type = "primary",
  style,
  ...props
}) {
  return (
    <View
      style={[
        styles.buttonBackground,
        style,
        !isActive
          ? styles.notPressed
          : { height: 50, width: 120, backgroundColor: colors.pastelPink },
      ]}
    >
      <TouchableOpacity
        style={[styles.buttonBackground, style, isActive ? styles.pressed : ""]}
        onPress={() => {
          handlePress();
        }}
        {...props}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    shadowColor: colors.pastelGrey,
    shadowOffset: { width: -3, height: -3 },
    shadowOpacity: 0.4,
    // borderWidth: 1,
    borderColor: colors.pastelGrey,
    shadowRadius: 3,
    height: 40,
    width: 110,
    backgroundColor: colors.pastelPink,
  },
  notPressed: {
    height: 50,
    width: 120,
    shadowColor: colors.pastelGrey,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.9,
    backgroundColor: colors.pastelPink,
  },
  buttonBackground: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 40,
    opacity: 0.95,
  },
  buttonText: {
    fontFamily: "Montserrat",
    color: colors.pastelGrey,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
  },
});
