import React, { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import Screen from "../../components/Screen";
import { useApi } from "../../hooks/useApi";
import BookDetails from "./BookDetails";
import UserDetails from "./UserDetails";
import ContactSeller from "./ContactSeller";
import BookImage from "./BookImage";

export default function ListingDetailScreen({ route }) {
  const [seller, setSeller] = useState(null);

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
        showsVerticalScrollIndicator
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
        <UserDetails user={seller ? seller : null} />
        <ContactSeller sellerId={seller?._id} book={book} />
      </ScrollView>
    </Screen>
  );
}
