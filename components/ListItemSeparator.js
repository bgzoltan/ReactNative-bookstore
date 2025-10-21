import { View } from "react-native";
import colors from "../config/colors";

export default function ListItemSeparator() {
  return (
    <View
      style={{
        width: "100%",
        height: 2,
        backgroundColor: colors.text.separator,
      }}
    ></View>
  );
}
