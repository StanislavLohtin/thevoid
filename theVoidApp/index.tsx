import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {RootStackParamList} from './types';
import Routes from "./navigation/Routes";
import {AuthUserProvider} from "./navigation/AuthUserProvider";

/*export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}*/

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

/*function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'Chat!!' }} />
    </Stack.Navigator>
  );
}*/

export default function Providers() {
  return (
    <AuthUserProvider>
      <Routes />
    </AuthUserProvider>
  );
}

// https://firebasestorage.googleapis.com/v0/b/thevoid-54561.appspot.com/o/avatars/ava1.png?alt=media
// gsutil cors set cors.json gs://thevoid-54561.appspot.com


