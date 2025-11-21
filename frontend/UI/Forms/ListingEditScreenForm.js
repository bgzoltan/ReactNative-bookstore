import AppFormSubmitButton from "../../components/Form/AppFormSubmitButton.js";
import { AppFormField } from "../../components/Form/AppFormField.js";
import { AppFormPicker } from "../../components/Form/AppFormPicker.js";
import * as Yup from "yup";
import colors from "../../config/colors.js";
import CategoryPickerItem from "../../components/CategoryPickerItem.js";
import AppFormImageInput from "../../components/Form/AppFormImageInput.js";

import useLocation from "../../hooks/useLocation.js";
import { useApi } from "../../hooks/useApi.js";

export const initialValues = {
  title: "",
  author: "",
  price: 0,
  category: null,
  description: "",
  images: [],
};
export const validationSchema = Yup.object({
  title: Yup.string()
    .required()
    .min(1, "Must be at least 1 character")
    .label("Title"),
  author: Yup.string()
    .required()
    .min(1, "Must be at least 1 character")
    .label("Author"),
  price: Yup.number().min(1).max(1000).label("Price"),
  category: Yup.object().required().nullable().label("Category"),
  description: Yup.string().label("Description"),
  images: Yup.array()
    .max(5, "Maximum 5 images allowed.")
    .required()
    .label("Images"),
});

export default function ListingEditScreenForm() {
  const location = useLocation();
  const { data, error } = useApi("get", "categories");

  // const { data, error, loading } = useApi("post", "categories", {
  //   content: "Other",
  //   icon: {
  //     name: "other",
  //     color: colors.icon.primary,
  //     backgroundColor: colors.icon.darkGrey,
  //   },
  // });

  error && console.log("CATEGORIES ERROR", error);

  return (
    <>
      <AppFormImageInput inputName="images" />
      <AppFormField
        inputName="title"
        placeholder="Title"
        autoCapitalize="sentences"
        autoCorrect={false}
        maxLength={20}
        required
      />
      <AppFormField
        inputName="author"
        placeholder="Author"
        autoCapitalize="sentences"
        autoCorrect={false}
        maxLength={20}
        required
      />
      <AppFormField
        inputName="price"
        placeholder="Price"
        keyboardType="numeric"
        maxLength={8}
        width={120}
        textAlign="right"
      />
      <AppFormPicker
        inputName="category"
        placeHolder="Select CATEGORY from scrollabel list"
        items={data || []}
        icon={{
          name: "list",
          size: 25,
          type: "Lucide",
          color: colors.icon.secondary,
          backgroundColor: colors.icon.white,
        }}
        width={"90%"}
        PickerItemComponent={CategoryPickerItem}
      />
      <AppFormField
        inputName="description"
        placeholder="Description"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={255}
      />

      <AppFormSubmitButton
        type={"primary"}
        handleSubmit={console.log("LOCATION", location)}
      >
        POST
      </AppFormSubmitButton>
    </>
  );
}
