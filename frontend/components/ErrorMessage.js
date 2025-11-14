import AppText from "./AppText/AppText";
import { defaultStyles } from "../config/defaultStyles";

export default function ErrorMessage({ error }) {
  if (!error) return null;
  return <AppText style={defaultStyles.error}>{error}</AppText>;
}
