import { View, StyleSheet, FlatList } from "react-native";
import { Icon } from "../Icon.js";
import { defaultStyles } from "../../config/defaultStyles.js";
import AppText from "../AppText/AppText.js";
import { useState } from "react";
import colors from "../../config/colors.js";
import { useFormikContext } from "formik";

export function AppPicker({
  inputName,
  icon,
  items,
  placeHolder,
  width,
  PickerItemComponent = "PickerItem",
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { values, setFieldValue } = useFormikContext();

  return (
    <View style={styles.container}>
      <View
        style={[
          defaultStyles.pickerBackground,
          { borderBottomLeftRadius: modalVisible ? 0 : 25 },
          { borderBottomRightRadius: modalVisible ? 0 : 25 },
          { borderBottomWidth: modalVisible ? 0 : 1 },
          { width: width },
        ]}
      >
        <AppText style={styles.selected}>
          {values[inputName] ? values[inputName].label : placeHolder}
        </AppText>
        <View
          style={{
            display: "flex",
            position: "absolute",
            right: 0,
          }}
        >
          <Icon
            handlePress={() => setModalVisible(!modalVisible)}
            name={"chevronDown"}
            size={icon.size}
            color={icon.color}
            backgroundColor={icon.backgroundColor}
          />
        </View>
      </View>

      {modalVisible && (
        <View style={[styles.modal, { width: width }]}>
          <FlatList
            style={styles.itemContainer}
            data={items}
            keyExtractor={(item) => item.value.toString()}
            showsVerticalScrollIndicator
            numColumns={
              PickerItemComponent.name == "CategoryPickerItem" ? 3 : 0
            }
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onSelectItem={() => {
                  setModalVisible(false);
                  setFieldValue(inputName, item);
                }}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}

export default AppPicker;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "relative",
  },
  selected: {
    padding: 10,
  },
  itemContainer: {
    display: "flex",
  },
  modal: {
    display: "flex",
    position: "absolute",
    top: 50,
    zIndex: 10,
    borderColor: colors.bg.border,
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: colors.bg.white,
    height: 250,
    opacity: 0.95,
  },
});
