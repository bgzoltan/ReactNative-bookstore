import { Image, View, StyleSheet, Text } from "react-native";
import colors from "../../config/colors";
import { useState, useEffect } from "react";
import LottieModal from "../../components/LottieModal";

export default function BookImage({ bookImages, currentIndex }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsLoaded(false);
    setHasTimedOut(false);

    const timeout = setTimeout(() => {
      setHasTimedOut(true); // hide loader after 5s
    }, 5000);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <LottieModal
        source={require("../../assets/loading.json")}
        isVisible={!isLoaded && !hasTimedOut}
        info="Loading image..."
      />
      {isLoaded && <Text style={styles.text}>Tap image to next</Text>}
      {bookImages.length > 0 && (
        <Image
          source={{ uri: bookImages[currentIndex]?.uri }}
          onLoad={() => {
            setIsLoaded(true);
            setIsLoading(false);
          }}
          onError={() => {
            setIsLoading(false);
          }}
          style={isLoaded ? styles.image : ""}
        />
      )}
      {hasTimedOut && !isLoaded && bookImages.length > 0 && (
        <Text style={styles.text}>Failed to load image. Try it later! </Text>
      )}
      {hasTimedOut && bookImages.length === 0 && (
        <Text style={styles.text}>No images available for this listing.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: 280,
    backgroundColor: colors.pastelWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    display: "flex",
    width: "90%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Montserrat",
    backgroundColor: colors.pastelPeach,
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
  },
});
