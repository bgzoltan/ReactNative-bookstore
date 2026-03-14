import AppButton from "../../components/AppButton/AppButton";
import { StyleSheet, View } from "react-native";

export default function MessageFilter({ filter, handleFilter }) {
  return (
    <View style={styles.container}>
      <AppButton
        style={
          filter === "received-messages"
            ? {
                fontWeight: "600",
              }
            : ""
        }
        isActive={filter === "received-messages"}
        handlePress={() => {
          handleFilter("received-messages");
        }}
      >
        RECEIVED
      </AppButton>
      <AppButton
        style={
          filter === "sent-messages"
            ? {
                fontWeight: "600",
              }
            : ""
        }
        isActive={filter === "sent-messages"}
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
    alignItems: "center",

    gap: 10,
    height: 70,
  },
});
