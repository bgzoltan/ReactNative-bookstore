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
import InfoModal from "../../components/InfoModal";
import ItemDeleteAction from "../../components/ItemDeleteAction";

export default function UserMessageList({ filter }) {
  // Get data from 'received-messages' or 'sent-messages' api depending on the value of filter
  const { data: messages, error, request: getMessages } = useApi("get", filter);
  const { request: deleteMessage } = useApi("delete", "messages/:id");

  const { isLoading } = useProgress();

  const [refreshing, setRefreshing] = useState(false);
  const [errorModal, setErrorModal] = useState({
    message: "",
    isVisible: false,
  });

  const closeErrorModal = () => {
    setErrorModal({ ...errorModal, isVisible: false });
  };

  const [infoModal, setInfoModal] = useState({
    isVisible: false,
    message: "",
  });

  const openInfoModal = () => {
    setInfoModal((prev) => ({
      ...prev,
      message: "Message sent successfully!",
      isVisible: true,
    }));
  };
  const closeInfoModal = () => {
    setInfoModal({ isVisible: false, message: "" });
  };

  const showErrorModal = () => {
    setErrorModal({ message: "Sent succesfully.", isVisible: true });
  };

  const handleDelete = async (messageId) => {
    // try-catch is not necessary because useAPi handles the errors consistently
    const { data, error } = await deleteMessage(null, { id: messageId });

    if (data) {
      // Success message
      setInfoModal({
        message: response.data.message,
        isVisible: true,
      });
      setRefreshing(true);
    } else {
      // Delete failed
      setErrorModal({
        message: error.message,
        isVisible: true,
      });
    }
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
                  openInfoModal={openInfoModal}
                  showErrorModal={showErrorModal}
                  handleDelete={() => handleDelete(item._id)}
                  filter={filter}
                  //  * Might be later add this functionality
                  // renderRightActions={() => (
                  //   <ItemDeleteAction
                  //     handleDelete={() => handleDelete(item._id)}
                  //   />
                  // )}
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
          <InfoModal infoModal={infoModal} closeInfoModal={closeInfoModal} />
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
