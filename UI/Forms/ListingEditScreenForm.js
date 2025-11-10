import AppFormSubmitButton from "../../components/Form/AppFormSubmitButton.js";
import { AppFormField } from "../../components/Form/AppFormField.js";
import { AppFormPicker } from "../../components/Form/AppFormPicker.js";
import * as Yup from "yup";
import colors from "../../config/colors.js";
import CategoryPickerItem from "../../components/CategoryPickerItem.js";
import AppFormImageInput from "../../components/Form/AppFormImageInput.js";

import useLocation from "../../hooks/useLocation.js";

export const initialValues = {
  price: 0,
  title: "",
  category: null,
  description: "",
  imageAssets: [],
};
export const validationSchema = Yup.object({
  title: Yup.string()
    .required()
    .min(1, "Must be at least 1 character")
    .label("Title"),
  price: Yup.number().min(1).max(1000).label("Price"),
  category: Yup.object().required().nullable().label("Category"),
  description: Yup.string().label("Description"),
  imageAssets: Yup.array()
    .max(5, "Maximum 5 images allowed.")
    .required()
    .label("Images"),
});

export default function ListingEditScreenForm() {
  const categories = [
    {
      label: "Furniture",
      value: 1,
      icon: {
        name: "furniture",
        color: colors.icon.primary,
        backgroundColor: colors.icon.red,
      },
    },
    {
      label: "Cars",
      value: 2,
      icon: {
        name: "cars",
        color: colors.icon.primary,
        backgroundColor: colors.icon.orange,
      },
    },
    {
      label: "Electronics",
      value: 3,
      icon: {
        name: "electronics",
        color: colors.icon.primary,
        backgroundColor: colors.icon.yellow,
      },
    },
    {
      label: "Games",
      value: 4,
      icon: {
        name: "games",
        color: colors.icon.primary,
        backgroundColor: colors.icon.green,
      },
    },
    {
      label: "Clothing",
      value: 5,
      icon: {
        name: "clothing",
        color: colors.icon.primary,
        backgroundColor: colors.icon.greenBlue,
      },
    },
    {
      label: "Sports",
      value: 6,
      icon: {
        name: "sports",
        color: colors.icon.primary,
        backgroundColor: colors.icon.lightBlue,
      },
    },
    {
      label: "Movies and music",
      value: 7,
      icon: {
        name: "movies",
        color: colors.icon.primary,
        backgroundColor: colors.icon.blue,
      },
    },
    {
      label: "Books",
      value: 8,
      icon: {
        name: "books",
        color: colors.icon.primary,
        backgroundColor: colors.icon.purple,
      },
    },
    {
      label: "Others",
      value: 9,
      icon: {
        name: "others",
        color: colors.icon.primary,
        backgroundColor: colors.icon.darkGrey,
      },
    },
  ];

  const location = useLocation();

  return (
    <>
      <AppFormImageInput inputName="imageAssets" />
      <AppFormField
        inputName="title"
        placeholder="Title"
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
        items={categories}
        icon={{
          name: "list",
          size: 25,
          type: "Lucide",
          color: colors.icon.secondary,
          backgroundColor: colors.icon.gray,
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
