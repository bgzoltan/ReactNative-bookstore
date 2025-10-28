import AppTextInput from "../components/AppTextInput/AppTextInput";
import Screen from "../components/Screen";
import { Image, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import AppButton from "../components/AppButton/AppButton";
import ListItemSeparator from "../components/ListItemSeparator.js";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen() {
  return (
    <Screen>
      <Image
        style={styles.logo}
        source={require("../assets/bookstoplogo.png")}
      />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, errors) => console.log(values, errors)}
        validationSchema={validationSchema}
      >
        {({ errors, handleChange, handleSubmit }) => (
          <>
            <Text>{errors.email}</Text>
            <AppTextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={"email=address"}
              textContentType={"emailAddres"}
              onChangeText={handleChange("email")}
              icon={{
                name: "email",
              }}
            />
            <ListItemSeparator color={colors.bg.white} height={20} />
            <Text>{errors.password}</Text>
            <AppTextInput
              autoCapitalize="none"
              autCorrenct={false}
              icon={{
                name: "lock",
              }}
              placeholder={"Password"}
              textContentType={"password"}
              secureTextEntry
              onChangeText={handleChange("password")}
            />
            <ListItemSeparator color={colors.bg.white} height={60} />
            <AppButton type={"primary"} onPress={handleSubmit}>
              LOGIN
            </AppButton>
          </>
        )}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  button: {
    display: "flex",
    width: "100%",
    height: "auto",
  },
});
