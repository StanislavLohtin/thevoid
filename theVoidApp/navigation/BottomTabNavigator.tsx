/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ChatListScreen from "../screens/ChatListScreen";
import ExploreScreen from "../screens/ExploreScreen";
import MembersScreen from "../screens/MembersScreen";
import {
  BottomTabParamList,
  ChatListTabParamList,
  ExploreTabParamList,
  MembersTabParamList,
} from "../types";
import { StyleSheet } from "react-native";
import UserService from "../services/UserService";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="ChatList"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarStyle: styles.container
      }}
    >
      <BottomTab.Screen
        name="ChatList"
        component={ChatTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-chatbubble" color={color} />
          ),
          tabBarLabel: "",
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={ExploreTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-compass" color={color} />
          ),
          tabBarLabel: "",
        }}
      />
      {UserService.currentUser?.isAdmin && (
        <BottomTab.Screen
          name="Members"
          component={MembersTabNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-people" color={color} />
            ),
            tabBarLabel: "",
          }}
        />
      )}
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "#686f76",
    backgroundColor: "#2e2e30",
    paddingTop: 0,
    borderTopWidth: 0,
  },
});

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ChatListTabStack = createStackNavigator<ChatListTabParamList>();

function ChatTabNavigator() {
  return (
    <ChatListTabStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatListTabStack.Screen
        name="ChatListScreen"
        component={ChatListScreen}
      />
    </ChatListTabStack.Navigator>
  );
}

const ExploreTabStack = createStackNavigator<ExploreTabParamList>();

function ExploreTabNavigator() {
  return (
    <ExploreTabStack.Navigator>
      <ExploreTabStack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ headerShown: false }}
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
        options={{ headerShown: false }}
      />
    </MembersTabStack.Navigator>
  );
}
