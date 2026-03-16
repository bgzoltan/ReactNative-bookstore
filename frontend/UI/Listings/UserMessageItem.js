import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import AppText from "../../components/AppText/AppText";
import { Icon } from "../../components/Icon";
import getTheTime from "../../utils/getTheTime";
import AnswerMessage from "./AnswerMessage";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function UserMessageItem({
  item,
  openInfoModal,
  showErrorModal,
  filter,
}) {
  const messageTime = getTheTime(item.timestamp);
  const [isAnswerModal, setIsAnswerModal] = useState(false);
  const { user } = useAuth();

  // Select the right name depending on received or sent messages
  let name;
  if (user._id == item.recipient._id) {
    name = item?.sender?.firstName;
  } else {
    name = item?.recipient?.firstName;
  }

  const handlePress = () => {
    setIsAnswerModal(!isAnswerModal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageRowContainer}>
        <View style={styles.messageContainer}>
          {item?.image ? (
            <Image style={styles.image} source={item.image} />
          ) : null}
          <View style={styles.subjectContainer}>
            <AppText weight="bold" style={styles.subject}>
              {">>"} {name}
            </AppText>
            <AppText style={styles.otherItem}>{messageTime}</AppText>
          </View>

          <AppText style={styles.name}>
            {item?.subject ? item?.subjet : "No subject..."}
          </AppText>
          <AppText style={styles.content}>{item?.content}</AppText>
        </View>
        <View style={styles.icons}>
          <Icon
            name="bin"
            color={colors.pastelGrey}
            backgroundColor={colors.pastelPink}
          />
          {filter === "received-messages" && (
            <TouchableOpacity
              style={styles.container}
              onPress={() => handlePress()}
            >
              <Icon
                name="mailAnswer"
                color={colors.pastelGrey}
                backgroundColor={colors.pastelPink}
                onPress={() => handlePress()}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isAnswerModal && (
        <AnswerMessage
          item={item}
          openInfoModal={openInfoModal}
          showErrorModal={showErrorModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  messageRowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 4,
    backgroundColor: colors.pastelPeach,
    borderRadius: 15,
  },
  messageContainer: {
    display: "flex",
    color: colors.text.white,
    flexGrow: 1,
    padding: 5,
    // borderRightWidth: 1,
    borderColor: colors.pastelGrey,
    width: "80%",
  },
  subjectContainer: {
    display: "flex",
    flexDirection: "row",
  },
  subject: {
    paddingBottom: 2,
    flexGrow: 1,
  },
  otherItem: { paddingBottom: 2 },
  name: {
    flex: 1,
    flexDirection: "column",
    paddingBottom: 2,
  },
  content: {
    display: "flex",
    paddingTop: 2,
    // borderTopWidth: 1,
    borderColor: colors.pastelGrey,
    minHeight: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icons: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    padding: 3,
  },
});
