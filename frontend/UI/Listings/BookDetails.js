import colors from "../../config/colors";
import { View, Text, StyleSheet } from "react-native";
export default function BookDetails({ book }) {
  return (
    <View style={styles.container}>
      <Text>Title: {book.title || "Unknown"}</Text>
      <Text>Author: {book.author || "Unknown"}</Text>
      <Text>Description: {book.description || "Unknown"}</Text>
      <Text style={styles.price}>Price: AUD$ {book.price || "Unknown"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.white,
    padding: 20,
    marginBottom: 20,
  },
  price: { color: "green", fontWeight: "bold", marginTop: 10 },
});
