import UserMessageItem from "./UserMessageItem";
import { useApi } from "../../hooks/useApi";
import { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ListItemSeparator from "../../components/ListItemSeparator";
import { useProgress } from "../../context/ProgressContext";
import LottieModal from "../../components/LottieModal";
import { ScrollView } from "react-native";

export default function UserMessageList({ filter }) {
  const { request: getMessages } = useApi("get", filter);
  const [messages, setMessages] = useState([]);
  const { isLoading, startLoading, endLoading } = useProgress();

  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (item) => {
    setMessages(messages.filter((message) => message.id !== item.id));
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessages();
        setMessages(response.data);
      } catch (err) {
      } finally {
        endLoading();
        setRefreshing(false);
      }
    };
    startLoading;
    fetchMessages();
  }, [filter, refreshing]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 10 }}
        showsVerticalScrollIndicator
      >
        <View style={styles.container}>
          <LottieModal
            source={require("../../assets/loading.json")}
            isVisible={isLoading}
            info="Loading messages..."
          />

          {!isLoading && (
            <FlatList
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
              scrollEnabled={false}
              data={messages}
              keyExtractor={(message) => message._id}
              renderItem={({ item }) => (
                <UserMessageItem
                  item={item}
                  renderRightActions={() => (
                    <ItemDeleteAction handleDelete={() => handleDelete(item)} />
                  )}
                />
              )}
              ItemSeparatorComponent={<ListItemSeparator />}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
              }}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
