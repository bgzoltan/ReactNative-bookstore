import Screen from "../../components/Screen";
import { useApi } from "../../hooks/useApi";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ListingList from "./ListingList";
import { Formik } from "formik";
import ListingFilter from "./ListingFilter";
import { useFormikContext } from "formik";
import ErrorModal from "../../components/ErrorModal";
import { View, StyleSheet } from "react-native";

function CategoryListener({ getListings }) {
  const { values } = useFormikContext();

  useEffect(() => {
    if (values.categoryFilter !== "") {
      // Get  filtered listings data
      if (values.categoryFilter == "Allbook") {
        getListings();
      } else {
        getListings(null, {}, { category: values.categoryFilter });
      }
    }
  }, [values.categoryFilter]);

  return null; // no UI
}

export default function ListingScreen({ navigation }) {
  const { data, error, request: getListings } = useApi("get", "listings");
  const [errorModal, setErrorModal] = useState({
    message: "",
    isVisible: false,
  });

  const closeErrorModal = () => {
    setErrorModal({ ...errorModal, isVisible: false });
  };

  const showErrorModal = (errorMessage) => {
    setErrorModal(errorMessage);
  };

  useFocusEffect(
    useCallback(() => {
      getListings();
    }, []),
  );

  useEffect(() => {
    if (error) {
      setErrorModal({ message: error.message, isVisible: true });
    }
  }, [error]);

  return (
    <Screen>
      <Formik initialValues={{ categoryFilter: "" }}>
        <View style={styles.container}>
          <ListingFilter showErrorModal={showErrorModal} />
          {/* On the change of the Listing filter category value filtered data will be loaded */}
          <CategoryListener getListings={getListings} />
        </View>
      </Formik>
      <ErrorModal errorModal={errorModal} closeErrorModal={closeErrorModal} />
      <ListingList listings={data} error={error} navigation={navigation} />
    </Screen>
  );
}

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
