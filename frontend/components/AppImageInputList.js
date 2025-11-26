import React from "react";
import { useEffect } from "react";
import ImageInputLayout from "./ImageInputLayout";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import AppImageInput from "./AppImageInput";
import { useFormikContext } from "formik";
import { StyleSheet, ScrollView, Alert } from "react-native";
export default function AppImageInputList({ inputName }) {
  const { values, setFieldValue } = useFormikContext();

  const addImage = async () => {
    // Give an option to the user to change permission if it is currently 'limited'
    async function checkMediaLibraryPermission() {
      const perm = await MediaLibrary.getPermissionsAsync();

      if (perm.accessPrivileges === "limited") {
        Alert.alert(
          "Limited photo access",
          "You gave access to only a few photos. Do you want to allow access to all photos?",
          [
            {
              text: "Keep limited",
              style: "cancel",
              onPress: launchImagePicker,
            },

            {
              text: "Access more photos",
              onPress: () => MediaLibrary.presentLimitedLibraryPickerAsync(),
            },

            {
              text: "Full access in phone Settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
      } else {
        launchPicker();
      }
    }
    checkMediaLibraryPermission();

    const launchImagePicker = async () => {
      // Loading system image picker
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync();
      const asset = assets[0];

      if (!canceled) {
        const isSelected = values[inputName].find(
          (asset) => asset.id == asset.assetId
        );
        if (isSelected) {
          Alert.alert("Wrong selection", "This image already selected");
          return;
        }
        const newImageAssets = [...values[inputName]];
        newImageAssets.push({
          id: asset.assetId,
          uri: asset.uri,
          fileName: asset.fileName,
        });
        // Store the new selected image
        setFieldValue(inputName, newImageAssets);
      }
    };
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
    <ScrollView
      style={{ flexGrow: 0 }}
      horizontal
      contentContainerStyle={styles.container}
    >
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
    height: 100,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
});
