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
  const categories = [
    {
      label: "Furniture",
      content: "Biography",
      icon: {
        name: "biography",
        color: colors.icon.primary,
        backgroundColor: colors.icon.red,
      },
    },
    {
      content: "History",
      icon: {
        name: "history",
        color: colors.icon.primary,
        backgroundColor: colors.icon.orange,
      },
    },
    {
      content: "Science",
      icon: {
        name: "science",
        color: colors.icon.primary,
        backgroundColor: colors.icon.yellow,
      },
    },
    {
      content: "Psychology",
      icon: {
        name: "psychology",
        color: colors.icon.primary,
        backgroundColor: colors.icon.green,
      },
    },
    {
      content: "Economics",
      icon: {
        name: "economics",
        color: colors.icon.primary,
        backgroundColor: colors.icon.greenBlue,
      },
    },
    {
      content: "Adventure",
      icon: {
        name: "adventure",
        color: colors.icon.primary,
        backgroundColor: colors.icon.lightBlue,
      },
    },
    {
      content: "Sci-fi",
      icon: {
        name: "scifi",
        color: colors.icon.primary,
        backgroundColor: colors.icon.blue,
      },
    },
    {
      content: "Crime",
      icon: {
        name: "crime",
        color: colors.icon.primary,
        backgroundColor: colors.icon.purple,
      },
    },
    {
      content: "Other",
      icon: {
        name: "other",
        color: colors.icon.primary,
        backgroundColor: colors.icon.darkGrey,
      },
    },
  ];

  const location = useLocation();

  // const { data, error, loading } = useApi("post", "categories", {
  //   content: "Other",
  //   icon: {
  //     name: "other",
  //     color: colors.icon.primary,
  //     backgroundColor: colors.icon.darkGrey,
  //   },
  // });

  // console.log("API DATA", data, error, loading);

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
        items={categories}
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
