import React from "react";
import { useEffect } from "react";
import { ImageInputLayout } from "./ImageInputLayout";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import AppImageInput from "./AppImageInput";
import { useFormikContext } from "formik";
import { StyleSheet, ScrollView, Alert } from "react-native";

export default function AppImageInputList({ inputName }) {
  const { values, setFieldValue } = useFormikContext();

  const addImage = async () => {
    const { canceled, assets } = await ImagePicker.launchImageLibraryAsync();
    const { assetId, uri } = assets[0];

    if (!canceled) {
      const isSelected = values[inputName].find((asset) => asset.id == assetId);
      if (isSelected) {
        Alert.alert("Wrong selection", "This image already selected");
        return;
      }
      const newImageAssets = [...values[inputName]];
      newImageAssets.push({
        id: assetId,
        uri,
      });
      setFieldValue(inputName, newImageAssets);
    }
  };

  const deleteImage = async (assetId) => {
    const newImageAssets = values[inputName].filter(
      (asset) => asset.id !== assetId
    );
    setFieldValue(inputName, newImageAssets);
  };

  useEffect(() => {
    async function getPermission() {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status == "denied") {
        Alert.alert(
          "Permission issue",
          "Please enable access to media library in settings."
        );
      }
    }

    getPermission();
  }, []);

  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      <ImageInputLayout handlePress={addImage} />
      {values[inputName].map((imageAsset) => (
        <AppImageInput
          handlePress={(id) => deleteImage(id)}
          key={imageAsset.id}
          imageAsset={imageAsset}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 3,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
});
