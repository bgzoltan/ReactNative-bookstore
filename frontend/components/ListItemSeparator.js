import { View } from "react-native";
import colors from "../config/colors";

export default function ListItemSeparator({ color, height }) {
  return (
    <View
      style={{
        width: "100%",
        height: height || 1,
        backgroundColor: color || colors.text.separator,
      }}
    />
  );
}
