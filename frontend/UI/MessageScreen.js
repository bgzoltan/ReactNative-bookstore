import { StyleSheet } from "react-native";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { useState } from "react";
import UserMessageList from "./Listings/UserMessageList";
import MessageFilter from "./Listings/MessageFilter";

export default function MessageScreen() {
  const [filter, setFilter] = useState("sent-messages");

  const handleFilter = (selected) => {
    setFilter(selected);
  };
  return (
    <Screen>
      <MessageFilter handleFilter={handleFilter} />
      <UserMessageList filter={filter} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.bg.white,
    alignItems: "center",
    justifyContent: "center",
  },
  itemRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});
