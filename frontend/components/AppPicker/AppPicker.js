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
        <Icon
          name={values[inputName].toLowerCase()}
          color={colors.pastelGrey}
          backgroundColor={colors.pastelYellow}
        />
        <AppText style={styles.selectedCategory}>
          {values[inputName] ? values[inputName] : placeHolder}
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
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator
            numColumns={
              PickerItemComponent.name == "CategoryPickerItem" ? 3 : 0
            }
            contentContainerStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              backgroundColor: colors.pastelPink,
            }}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onSelectItem={(value) => {
                  setModalVisible(false);
                  setFieldValue(inputName, value);
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
    backgroundColor: colors.pastelYellow,
  },
  selectedCategory: {
    fontFamily: "MontserratRegular",
    display: "flex",
    flexGrow: 1,
    color: colors.pastelGrey,
    backgroundColor: colors.pastelYellow,
    borderRadius: 25,
    fontSize: 16,
  },
  itemContainer: {
    display: "flex",
    backgroundColor: colors.pastelYellow,
    borderRadius: 25,
  },
  modal: {
    display: "flex",
    position: "absolute",
    top: 50,
    zIndex: 10,
    borderColor: colors.pastelGrey,
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: colors.pastelYellow,
    height: 300,
    opacity: 0.95,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});
