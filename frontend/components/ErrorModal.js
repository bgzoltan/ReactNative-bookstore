import { Modal, StyleSheet, View, Text } from "react-native";
import AppButton from "./AppButton/AppButton";
import colors from "../config/colors";

export default function ErrorModal({ errorModal, closeErrorModal }) {
  const { message, isVisible } = errorModal;

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          closeErrorModal();
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <AppButton handlePress={closeErrorModal}>CONTINUE</AppButton>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "60%",
    backgroundColor: colors.pastelWhite,
    borderRadius: 25,
    padding: 35,
    alignItems: "center",
    shadowColor: colors.pastelGrey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
