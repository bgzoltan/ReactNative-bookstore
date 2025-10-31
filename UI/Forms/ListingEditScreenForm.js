import AppFormSubmitButton from "../../components/Form/AppFormSubmitButton.js";
import { AppFormField } from "../../components/Form/AppFormField.js";
import { AppFormPicker } from "../../components/Form/AppFormPicker.js";
import * as Yup from "yup";
import colors from "../../config/colors.js";

export const initialValues = {
  price: 0,
  title: "",
  category: null,
  description: "",
};
export const validationSchema = Yup.object({
  title: Yup.string()
    .required()
    .min(1, "Must be at least 1 character")
    .label("Title"),
  price: Yup.number().min(1).max(1000).label("Price"),
  category: Yup.object().required().nullable().label("Category"),
  description: Yup.string().label("Description"),
});

export default function ListingEditScreenForm() {
  const categories = [
    { label: "Furniture", value: 1 },
    { label: "Clothing", value: 2 },
    { label: "Camera", value: 3 },
    { label: "Disc", value: 4 },
    { label: "Tool", value: 5 },
    { label: "Shoe", value: 6 },
    { label: "Book", value: 7 },
  ];
  return (
    <>
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
      />
      <AppFormPicker
        inputName="category"
        placeHolder="Select CATEGORY from scrollabel list"
        items={categories}
        icon={{
          name: "list",
          size: 25,
          type: "FontAwesome",
          color: colors.icon.secondary,
          backgroundColor: colors.icon.gray,
        }}
      />
      <AppFormField
        inputName="description"
        placeholder="Description"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={255}
      />

      <AppFormSubmitButton type={"primary"}>POST</AppFormSubmitButton>
    </>
  );
}
