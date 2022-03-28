import * as React from "react";
import { useEffect } from "react";
import { FlatList, ImageBackground, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import UserService from "../services/UserService";
import IconButton from "../components/IconButton";
import { darkerPurple } from "../constants/Colors";
import { UserInAListComponent } from "../components/UserInAListComponent";
import { UserPublic } from "../classes/UserPublic";
import ChatService from "../services/ChatService";
import {StackNavigationProp} from "@react-navigation/stack";
import {ChatListTabParamList} from "../types";

export default function CreateChatScreen() {
  const [searchText, setSearchText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [selectedUsers] = React.useState(new Set<UserPublic>());
  const users = UserService.users;
  const navigation = useNavigation<StackNavigationProp<ChatListTabParamList>>();

  useEffect(() => {}, []);

  async function onCreateChat() {
    if (selectedUsers.size < 2) {
      console.warn("need at least 2 users for a chat");
      return;
    }
    console.log(`trying to create chat with name: ${title}`);
    setSearchText("");
    let userIds = [];
    for (const user of selectedUsers) {
      userIds.push(user.id);
    }
    const success = await ChatService.createChat({
      title: title,
      lastMessageId: "",
      type: 0,
      userIds: userIds,
      createdAt: null,
      createdBy: UserService.currentUser.id
    });
    if (success) {
      navigation.navigate("ChatListScreen");
    }
  }

  function onTouchUser(user: UserPublic) {
    if (selectedUsers.has(user)) {
      selectedUsers.delete(user);
      return;
    }
    selectedUsers.add(user);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require("./../assets/images/chatListBg.png")}
      >
        <View style={styles.header}>
          <IconButton
            style={styles.button}
            iconName="chevron-left"
            color={darkerPurple}
            size={42}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}> Create new chat/group </Text>
          <IconButton
            style={styles.button}
            iconName="check"
            color={darkerPurple}
            size={35}
            onPress={onCreateChat}
          />
        </View>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
            placeholder="Group/Course Title"
            placeholderTextColor={"#888a8f"}
            keyboardType="default"
          ></TextInput>
          <TextInput
            style={styles.input}
            onChangeText={setSearchText}
            value={searchText}
            placeholder="Search"
            placeholderTextColor={"#888a8f"}
            keyboardType="default"
          ></TextInput>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <UserInAListComponent user={item} onTouchUserFn={onTouchUser} />
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    flexDirection: "column",
  },
  content: {
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 18,
    color: "white",
    paddingTop: 5,
    paddingLeft: 5,
  },
  button: {
    marginRight: 10,
  },
  sendButton: {
    maxHeight: 26,
    maxWidth: 40,
    top: -12,
  },
  messageList: {
    maxHeight: "calc(100vh - 140px)",
    backgroundColor: "transparent",
  },
  header: {
    paddingTop: 45,
    paddingBottom: 10,
    backgroundColor: "transparent",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderRadius: 20,
    backgroundColor: "#243a44",
    color: "white",
    fontSize: 15,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    margin: 10,
  },
});
