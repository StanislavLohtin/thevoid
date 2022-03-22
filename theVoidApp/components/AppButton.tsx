import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {darkerPurple} from "../constants/Colors";

export default function AppButton({ title, onPress, color = 'primary' }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: darkerPurple }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%'
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase'
  }
});
