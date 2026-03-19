import colors from "./colors";

export const defaultStyles = {
  pickerBackground: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.pastelYellow,
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
    color: colors.pastelRed,
    backgroundColor: colors.pastelWhite,
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
    fontFamily: "MontserratRegular",
    color: "black",
  },
};
