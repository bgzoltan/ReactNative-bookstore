import { StyleSheet, Image, View } from "react-native";
import colors from "../../config/colors";
import AppText from "../../components/AppText/AppText";
import { Icon } from "../../components/Icon";

export default function UserMessageItem({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        {item?.image ? (
          <Image style={styles.image} source={item.image} />
        ) : null}
        <AppText style={styles.name}>
          Name: {item?.recipient?.firstName}
        </AppText>
        <AppText style={styles.content}>{item?.content}</AppText>
      </View>
      <Icon name="bin" color={colors.icon.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: 5,
  },
  messageContainer: {
    display: "flex",
    backgroundColor: colors.bg.primary,
    color: colors.text.white,
    width: "80%",
    marginBottom: 20,
  },
  name: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
    fontWeight: "600",
  },
  content: {
    padding: 5,
    // backgroundColor: colors.bg.danger,
    minHeight: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
