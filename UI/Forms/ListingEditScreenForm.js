import AppFormSubmitButton from "../../components/Form/AppFormSubmitButton.js";
import { AppFormField } from "../../components/Form/AppFormField.js";
import { AppFormPicker } from "../../components/Form/AppFormPicker.js";
import * as Yup from "yup";
import colors from "../../config/colors.js";

export const initialValues = {
  price: 0,
  title: "",
  category: "",
  description: "",
};
export const validationSchema = Yup.object({
  title: Yup.string()
    .required()
    .min(1, "Must be at least 1 character")
    .label("Title"),
  price: Yup.number().min(1).max(1000).label("Price"),
  category: Yup.string().required().label("Category"),
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
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={"default"}
        textContentType={"none"}
        inputName={"title"}
        placeholder={"Title"}
        icon={{
          name: "",
        }}
        required
      />
      <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={"numeric"}
        textContentType={"none"}
        inputName={"price"}
        placeholder={"Price"}
        icon={{
          name: "",
        }}
      />
      <AppFormPicker
        inputName="category"
        icon={{
          name: "list",
          size: 25,
          type: "FontAwesome",
          color: colors.icon.secondary,
          backgroundColor: colors.icon.gray,
        }}
        items={categories}
        placeHolder="Select CATEGORY from scrollabel list"
      />
      <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={"default"}
        textContentType={"none"}
        inputName={"description"}
        placeholder={"Description"}
        icon={{
          name: "",
        }}
      />

      <AppFormSubmitButton type={"primary"}>POST</AppFormSubmitButton>
    </>
  );
}
