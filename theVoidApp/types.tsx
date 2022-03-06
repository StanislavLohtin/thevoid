/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  ChatScreen: {id: string};
  UserProfileScreen: undefined;
  CreateChatScreen: undefined;
};

export type BottomTabParamList = {
  ChatList: undefined;
  Explore: undefined;
  Members: undefined;
};

export type ChatListTabParamList = {
  ChatListScreen: undefined;
};

export type ExploreTabParamList = {
  ExploreScreen: undefined;
};

export type MembersTabParamList = {
  MembersScreen: undefined;
};
