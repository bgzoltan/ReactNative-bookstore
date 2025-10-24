import { View, TouchableOpacity } from "react-native";
import Screen from "../Screen";
import { Icon } from "../Icon.js";
import { defaultStyles } from "../../config/defaultStyles.js";
import AppText from "../AppText/AppText.js";

export function AppPicker({ icon, placeHolder, ...props }) {
  return (
    <Screen>
      <View style={defaultStyles.pickerBackground}>
        <Icon
          name={icon.name}
          size={icon.size}
          color={icon.color}
          backgroundColor={icon.backgroundColor}
        />
        <AppText>{placeHolder}</AppText>
        <TouchableOpacity
          style={{
            display: "flex",
            position: "absolute",
            right: 0,
          }}
        >
          <Icon
            name={"chevron-down"}
            size={icon.size}
            color={icon.color}
            backgroundColor={icon.backgroundColor}
          />
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

export default AppPicker;
