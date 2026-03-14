import UserMessageItem from "./UserMessageItem";
import { useApi } from "../../hooks/useApi";
import { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ListItemSeparator from "../../components/ListItemSeparator";
import { useProgress } from "../../context/ProgressContext";
import LottieModal from "../../components/LottieModal";
import { ScrollView } from "react-native";
import ErrorModal from "../../components/ErrorModal";
import colors from "../../config/colors";

export default function UserMessageList({ filter }) {
  // Get data from 'received-messages' or 'sent-messages' api depending on the value of filter
  const { data: messages, error, request: getMessages } = useApi("get", filter);
  const { isLoading } = useProgress();

  const [refreshing, setRefreshing] = useState(false);
  const [errorModal, setErrorModal] = useState({
    message: "",
    isVisible: false,
  });

  const closeErrorModal = () => {
    setErrorModal({ ...errorModal, isVisible: false });
  };

  const handleDelete = (item) => {
    // setMessages(messages.filter((message) => message.id !== item.id));
  };

  useEffect(() => {
    getMessages();
  }, [filter]);

  useEffect(() => {
    if (error) {
      setErrorModal({ message: error.message, isVisible: true });
    }
  }, [error]);

  useEffect(() => {
    if (refreshing) {
      getMessages();
      setRefreshing(false);
    }
  }, [refreshing]);

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
              ItemSeparatorComponent={() => (
                <ListItemSeparator color={colors.pastelWhite} />
              )}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
              }}
            />
          )}
          <ErrorModal
            errorModal={errorModal}
            closeErrorModal={closeErrorModal}
          />
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
