import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { darkerPurple } from "../constants/Colors";

export default function AppButton({ title, onPress, disabled = false }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: darkerPurple },
        disabled ? styles.disabled : null,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  disabled: {
    opacity: 0.3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
