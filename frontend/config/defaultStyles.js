import colors from "./colors";
import { Platform } from "react-native";

export const defaultStyles = {
  inputText: {
    color: colors.text.gray,
    borderRadius: 5,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize: 16,
    width: "100%",
  },
  inputBackground: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    gap: 10,
    backgroundColor: colors.bg.white,
    borderRadius: 25,
    borderColor: "gray",
    borderWidth: 1,
    height: 50,
  },
  pickerBackground: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    gap: 10,
    backgroundColor: colors.bg.white,
    borderColor: "gray",
    borderWidth: 1,
    height: 50,
    borderRadius: 25,
  },
  errorContainer: {
    height: 18,
    paddingVertical: 1,
  },
  error: {
    marginLeft: 15,
    color: colors.bg.danger,
    backgroundColor: colors.bg.gray,
  },
  logo: {
    width: 120,
    height: 102,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 12,
    color: "black",
  },
  logoText: {
    fontSize: 12,
    color: "black",
  },
};
