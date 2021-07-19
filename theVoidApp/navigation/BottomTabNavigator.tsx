/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChatScreen from '../screens/ChatScreen';
import ExploreScreen from '../screens/ExploreScreen';
import MembersScreen from '../screens/MembersScreen';
import {BottomTabParamList, ChatTabParamList, ExploreTabParamList, MembersTabParamList} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Chat"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Chat"
        key="asdasd"
        component={ChatTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={ExploreTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Members"
        component={MembersTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ChatTabStack = createStackNavigator<ChatTabParamList>();

function ChatTabNavigator() {
  return (
    <ChatTabStack.Navigator>
      <ChatTabStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </ChatTabStack.Navigator>
  );
}

const ExploreTabStack = createStackNavigator<ExploreTabParamList>();

function ExploreTabNavigator() {
  return (
    <ExploreTabStack.Navigator>
      <ExploreTabStack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ headerTitle: 'Explore The Void' }}
      />
    </ExploreTabStack.Navigator>
  );
}

const MembersTabStack = createStackNavigator<MembersTabParamList>();

function MembersTabNavigator() {
  return (
    <MembersTabStack.Navigator>
      <MembersTabStack.Screen
        name="MembersScreen"
        component={MembersScreen}
        options={{ headerTitle: 'Members' }}
      />
    </MembersTabStack.Navigator>
  );
}
