import colors from "../../config/colors";
import { View, Text, StyleSheet } from "react-native";
export default function BookDetails({ book }) {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textTitle}>Title</Text>
      <Text style={styles.text}>{book.title || "Unknown"}</Text>
      <Text style={styles.textTitle}>Author</Text>
      <Text style={styles.text}>{book.author || "Unknown"}</Text>
      <Text style={styles.textTitle}>Description</Text>
      <Text style={styles.text}>{book.description || "Unknown"}</Text>
      <Text style={styles.price}>Price: AUD$ {book.price || "Unknown"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    display: "flex",
    padding: 5,
    backgroundColor: colors.pastelWhite,
  },
  textTitle: {
    fontSize: 16,
    fontFamily: "MontserratRegular",
    fontWeight: "600",
    paddingVertical: 2,
  },
  text: {
    fontSize: 16,
    fontFamily: "Montserrat",
  },
  price: {
    fontSize: 18,
    fontFamily: "Montserrat",
    color: colors.pastelRed,
    fontWeight: "bold",
    marginTop: 10,
  },
});
