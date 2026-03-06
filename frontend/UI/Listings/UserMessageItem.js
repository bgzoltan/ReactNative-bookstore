import { StyleSheet, Image, View } from "react-native";
import colors from "../../config/colors";
import AppText from "../../components/AppText/AppText";
import { Icon } from "../../components/Icon";
import getTheTime from "../../utils/getTheTime";

export default function UserMessageItem({ item }) {
  const messageTime = getTheTime(item.timestamp);
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        {item?.image ? (
          <Image style={styles.image} source={item.image} />
        ) : null}
        <View style={styles.subjectContainer}>
          <AppText weight="bold" style={styles.subject}>
            {">>"} {item?.recipient?.firstName}
          </AppText>
          <AppText style={styles.otherItem}>{messageTime}</AppText>
        </View>

        <AppText style={styles.name}>
          {item?.subject ? item?.subjet : "No subject..."}
        </AppText>
        <AppText style={styles.content}>{item?.content}</AppText>
      </View>
      <Icon
        name="bin"
        color={colors.icon.black}
        backgroundColor={colors.icon.red}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 4,
    backgroundColor: colors.bg.primary,
    borderRadius: 5,
  },
  messageContainer: {
    display: "flex",
    flexGrow: 1,
    color: colors.text.white,
    padding: 5,
    borderRightWidth: 1,
    borderColor: colors.text.primary,
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
    paddingTop: 2,
    borderTopWidth: 1,
    borderColor: colors.text.primary,
    minHeight: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
