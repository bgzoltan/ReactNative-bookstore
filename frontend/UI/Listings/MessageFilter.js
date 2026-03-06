import AppButton from "../../components/AppButton/AppButton";
import { StyleSheet, View } from "react-native";

export default function MessageFilter({ handleFilter }) {
  return (
    <View style={styles.container}>
      <AppButton
        style={{ width: "40%" }}
        handlePress={() => handleFilter("sent-messages")}
      >
        SENT
      </AppButton>
      <AppButton
        style={{ width: "40%" }}
        handlePress={() => handleFilter("received-messages")}
      >
        RECEIVED
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
