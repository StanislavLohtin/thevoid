/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import firebase from 'firebase/app';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import {UserService} from "../services/UserService";
import ChatScreen from "../screens/ChatScreen";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'Chat!!' }} />
    </Stack.Navigator>
  );
}

const firebaseConfig = {
    apiKey: "AIzaSyD_BqfEgKj5qxkUXjo1s4MQxL67ChQS19w",
    authDomain: "thevoid-54561.firebaseapp.com",
    projectId: "thevoid-54561",
    storageBucket: "thevoid-54561.appspot.com",
    messagingSenderId: "792083192023",
    appId: "1:792083192023:web:9046e9337dc70da8f6f892",
    measurementId: "G-TC8FLKK846"
};

firebase.initializeApp(firebaseConfig);

UserService.init(2);
