import { AppFormPicker } from "../../components/Form/AppFormPicker";
import { useApi } from "../../hooks/useApi";
import { useEffect } from "react";
import colors from "../../config/colors";
import CategoryPickerItem from "../../components/CategoryPickerItem";

export default function ListingFilter({ showErrorModal }) {
  const { data, error, request: getCategories } = useApi("get", "categories");

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (error) {
      showErrorModal({ message: error.message, isVisible: true });
    }
  }, error);

  useEffect(() => {
    if (error) {
      console.log(
        "ListingFilter error:",
        error.message ? error.message : "Error during getFilters",
      );
    }
  }, [error]);

  const allBook = {
    content: "Allbook",
    icon: {
      name: "allbook",
      color: colors.pastelWhite,
      backgroundColor: colors.pastelRed,
    },
  };
  return (
    <AppFormPicker
      inputName="categoryFilter"
      placeHolder=" Select CATEGORY to filter"
      items={data ? [allBook, ...data] : []}
      icon={{
        name: "list",
        size: 25,
        type: "Lucide",
        color: colors.pastelGrey,
        backgroundColor: colors.pastelYellow,
      }}
      width={"90%"}
      PickerItemComponent={CategoryPickerItem}
    />
  );
}
