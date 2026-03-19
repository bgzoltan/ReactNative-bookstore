import { Modal, StyleSheet, View, Text } from "react-native";
import AppButton from "./AppButton/AppButton";
import colors from "../config/colors";

export default function InfoModal({ infoModal, closeInfoModal }) {
  const { message, isVisible } = infoModal;

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          closeInfoModal();
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <AppButton style={styles.button} handlePress={closeInfoModal}>
              Close
            </AppButton>
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
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
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
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    width: 150,
    heigth: 50,
  },
});
