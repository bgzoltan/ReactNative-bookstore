import { StyleSheet, Image, View } from "react-native";
import colors from "../../config/colors";
import AppText from "../../components/AppText/AppText";

export default function UserDetails({ user, ...props }) {
  const { style } = props;
  return (
    <View style={styles.container}>
      {user?.image ? <Image style={styles.image} source={user.image} /> : null}
      <AppText style={[styles.name, style]}>
        {`${user?.firstName} ${user?.lastName}`}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    color: colors.pastelGrey,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    borderRadius: 15,
  },
  name: {
    fontFamily: "Montserrat",
    fontSize: 16,
    flex: 1,
    flexDirection: "column",
    padding: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
