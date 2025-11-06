import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

export default function AppImageInput({ imageAsset, handlePress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handlePress(imageAsset.id)}
    >
      {imageAsset.uri && (
        <Image
          source={{ uri: imageAsset.uri }}
          style={{ width: 100, height: 100 }}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
});
