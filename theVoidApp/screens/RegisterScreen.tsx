import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import SafeView from "../components/SafeView";
import Form from "../components/Forms/Form";
import FormField from "../components/Forms/FormField";
import FormButton from "../components/Forms/FormButton";
import IconButton from "../components/IconButton";
import FormErrorMessage from "../components/Forms/FormErrorMessage";
import { registerWithEmail } from "../components/Firebase/firebase";
import useStatusBar from "../hooks/useStatusBar";
import Colors from "../constants/Colors";
import UserService from "../services/UserService";
import ChatService from "../services/ChatService";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("First Name"),
  lastname: Yup.string().required().label("Last Name"),
  email: Yup.string()
    .required("Please enter a valid email")
    .email()
    .label("Email"),
  password: Yup.string()
    .required()
    .min(6, "Password must have at least 6 characters")
    .label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must match Password")
    .required("Confirm Password is required"),
});

export default function RegisterScreen({ navigation }) {
  useStatusBar("light-content");

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [rightIcon, setRightIcon] = useState("eye");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState("eye");
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);
  const [registerError, setRegisterError] = useState("");
  let destroying = false;

  useEffect(() => {
    return () => {
      destroying = true;
    };
  });

  function handlePasswordVisibility() {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  }

  function handleConfirmPasswordVisibility() {
    if (confirmPasswordIcon === "eye") {
      setConfirmPasswordIcon("eye-off");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === "eye-off") {
      setConfirmPasswordIcon("eye");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  }

  async function handleOnSignUp(values, actions?) {
    const { email, password, firstname, lastname } = values;
    console.log("setting Disabled true");
    setButtonDisabled(true);
    registerWithEmail(email, password, firstname, lastname).then(
      () => {
        if (destroying) {
          return;
        }
        console.log("setting Disabled false");
        setButtonDisabled(false);
      },
      (error) => {
        console.log("setting Disabled false");
        setButtonDisabled(false);
        setRegisterError(error.message);
      }
    );
  }

  return (
    <SafeView style={styles.container}>
      <Form
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleOnSignUp(values)}
      >
        <Text style={styles.titleText}> Enter your mindbody credentials </Text>
        <FormField
          name="firstname"
          leftIcon="account"
          placeholder="First name"
          autoFocus={true}
        />
        <FormField
          name="lastname"
          leftIcon="account"
          placeholder="Last name"
          autoFocus={true}
        />
        <FormField
          name="email"
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <FormField
          name="password"
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <FormField
          name="confirmPassword"
          leftIcon="lock"
          placeholder="Confirm password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={confirmPasswordVisibility}
          textContentType="password"
          rightIcon={confirmPasswordIcon}
          handlePasswordVisibility={handleConfirmPasswordVisibility}
        />
        <FormButton title={"Register"} disabled={buttonDisabled} />
        {<FormErrorMessage error={registerError} visible={true} />}
      </Form>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color={"white"}
        size={30}
        onPress={() => navigation.goBack()}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.dark.mediumGrey,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  titleText: {
    marginVertical: 2,
    color: "white",
    fontSize: 18,
  },
});
