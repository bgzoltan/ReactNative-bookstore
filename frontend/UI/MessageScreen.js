import Screen from "../components/Screen";
import { useState } from "react";
import UserMessageList from "./Listings/UserMessageList";
import MessageFilter from "./Listings/MessageFilter";
import { useProgress } from "../context/ProgressContext";

export default function MessageScreen() {
  const [filter, setFilter] = useState("sent-messages");
  const { isLoading } = useProgress();

  const handleFilter = (selected) => {
    setFilter(selected);
  };
  return (
    <Screen>
      {!isLoading && <MessageFilter handleFilter={handleFilter} />}
      <UserMessageList filter={filter} />
    </Screen>
  );
}
