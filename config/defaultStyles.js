import colors from "./colors";
import { Platform } from "react-native";

export const defaultStyles = {
  inputText: {
    color: colors.text.gray,
    borderRadius: 5,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize: 16,
  },
  inputBackground: {
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
  pickerBackground: {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    gap: 10,
    width: "100%",
    backgroundColor: colors.bg.gray,
    borderColor: "gray",
    borderWidth: 1,
  },
};
