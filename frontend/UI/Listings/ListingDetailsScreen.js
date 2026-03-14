import React, { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView, Text } from "react-native";
import Screen from "../../components/Screen";
import { useApi } from "../../hooks/useApi";
import BookDetails from "./BookDetails";
import UserDetails from "./UserDetails";
import ContactSeller from "./ContactSeller";
import BookImage from "./BookImage";
import { useAuth } from "../../context/AuthContext";
import { StyleSheet } from "react-native";

export default function ListingDetailScreen({ route }) {
  const [seller, setSeller] = useState(null);
  const { user } = useAuth();

  // Get the details of the listing which is passed as a parameter when navigating to this screen.
  const book = route.params;
  const { images: bookImages = [], userId: sellerId } = book;

  // Get the details of the seller using the userId
  const { request: getUser } = useApi("get", `users/${sellerId}`);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUser();
        setSeller(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);

  const numberOfImages = bookImages.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 10 }}
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
      >
        <TouchableOpacity
          onPress={() => {
            // Cycle through images on each tap
            setCurrentIndex((currentIndex + 1) % numberOfImages);
          }}
        >
          <BookImage bookImages={bookImages} currentIndex={currentIndex} />
        </TouchableOpacity>
        <BookDetails book={book} />
        {/* Just to show on the FEED details */}
        {user._id !== seller?._id && (
          <>
            <Text style={styles.text}>Owner</Text>
            <UserDetails user={seller ? seller : null} />

            <ContactSeller sellerId={seller?._id} book={book} />
          </>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 5,
  },
});
