import Screen from "../components/Screen.js";
import ListingEditScreenForm, {
  initialValues,
  validationSchema,
} from "./Forms/ListingEditScreenForm.js";

import AppForm from "../components/Form/AppForm.js";

export default function ListingEditScreen() {
  const onSubmit = (values) => console.log("Submitted...", values);

  return (
    <Screen>
      <AppForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <ListingEditScreenForm />
      </AppForm>
    </Screen>
  );
}
