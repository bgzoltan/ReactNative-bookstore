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
        isVisible={!isLoaded && isLoading && !hasTimedOut}
        info="Loading image..."
      />
      {isLoaded && <Text>Tap the image to see next image</Text>}
      {isLoaded && hasTimedOut && (
        <Image
          source={{ uri: bookImages[currentIndex]?.uri }}
          onLoad={() => {
            setIsLoaded(true);
            setIsLoading(false);
          }}
          onError={() => {
            setIsLoading(false);
          }}
          style={styles.image}
        />
      )}
      {hasTimedOut && !isLoaded && bookImages.length > 0 && (
        <Text>Failed to load image. Try it later! </Text>
      )}
      {hasTimedOut && bookImages.length === 0 && (
        <Text>No images available for this listing.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: 250,
    backgroundColor: colors.bg.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    display: "flex",
    width: "90%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg.white,
    borderWidth: 2,
    borderColor: colors.bg.secondary,
  },
});
