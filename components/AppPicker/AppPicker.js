import { View, Modal, StyleSheet, FlatList } from "react-native";
import Screen from "../Screen";
import { Icon } from "../Icon.js";
import { defaultStyles } from "../../config/defaultStyles.js";
import AppText from "../AppText/AppText.js";
import { useState } from "react";
import colors from "../../config/colors.js";
import PickerItem from "../PickerItem.js";

export function AppPicker({ icon, items, placeHolder, ...props }) {
  const [modalVisible, setModalVisible] = useState(false);
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
        <View
          style={{
            display: "flex",
            position: "absolute",
            right: 0,
          }}
        >
          <Icon
            handlePress={() => setModalVisible(true)}
            name={"chevron-down"}
            size={icon.size}
            color={icon.color}
            backgroundColor={icon.backgroundColor}
          />
        </View>
      </View>
      <Modal visible={modalVisible} animationType="fade">
        <Screen>
          <Icon
            handlePress={() => setModalVisible(false)}
            name={"close"}
            size={24}
            color={colors.text.primary}
            backgroundColor={colors.bg.primary}
          />
          <FlatList
            style={styles.list}
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => <PickerItem item={item} />}
          ></FlatList>
        </Screen>
      </Modal>
    </Screen>
  );
}

export default AppPicker;

const styles = StyleSheet.create({
  list: {
    borderBlockColor: colors.bg.black,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});
