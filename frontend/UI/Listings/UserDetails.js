import { StyleSheet, Image, View } from "react-native";
import colors from "../../config/colors";
import AppText from "../../components/AppText/AppText";

export default function UserDetails({ user }) {
  return (
    <View style={styles.container}>
      {user?.image ? <Image style={styles.image} source={user.image} /> : null}
      <AppText style={styles.name}>
        {`${user?.firstName} ${user?.lastName}`}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: colors.bg.white,
    color: colors.text.gray,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  name: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    fontWeight: "600",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
