import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from "./BottomTabNavigator";
import NotFoundScreen from "../screens/NotFoundScreen";
import ChatScreen from "../screens/ChatScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import CreateChatScreen from "../screens/CreateChatScreen";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen}/>
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{title:"ChatScreen!!"}}/>
      <Stack.Screen name="CreateChatScreen" component={CreateChatScreen}/>
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen}/>
    </Stack.Navigator>
  );
}
