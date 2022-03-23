import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import AppButton from '../components/AppButton';
import {defBg, defPurple} from '../constants/Colors';
import useStatusBar from '../hooks/useStatusBar';

export default function WelcomeScreen({ navigation }) {
  useStatusBar('light-content');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/voidColorWhite.png')} style={styles.logo} />
        <Text style={styles.subtitle}>The Void</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
        <AppButton
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: defBg
  },
  logoContainer: {
    position: 'absolute',
    top: 60,
    alignItems: 'center'
  },
  logo: {
    width: 125,
    height: 125
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingVertical: 20,
    color: defPurple
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    width: '100%'
  }
});
