import AppButton from "../../components/AppButton/AppButton";
import { StyleSheet, View } from "react-native";
import colors from "../../config/colors";

export default function MessageFilter({ filter, handleFilter }) {
  return (
    <View style={styles.container}>
      <AppButton
        style={
          filter === "received-messages"
            ? { backgroundColor: colors.bg.yellow, width: "40%" }
            : { backgroundColor: colors.bg.primary, width: "40%" }
        }
        handlePress={() => {
          handleFilter("received-messages");
        }}
      >
        RECEIVED
      </AppButton>
      <AppButton
        style={
          filter === "sent-messages"
            ? { backgroundColor: colors.bg.yellow, width: "40%" }
            : { backgroundColor: colors.bg.primary, width: "40%" }
        }
        handlePress={() => {
          handleFilter("sent-messages");
        }}
      >
        SENT
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
