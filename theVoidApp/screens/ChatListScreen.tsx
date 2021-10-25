import * as React from "react";
import {
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { View } from "../components/Themed";
import { ChatComponent } from "../components/ChatComponent";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { useNavigation } from "@react-navigation/native";
import ChatService from "../services/ChatService";
import { Chat } from "../classes/Chat";
import IconButton from "../components/IconButton";
import { darkerPurple } from "../constants/Colors";

export default function ChatListScreen() {
  const [text, onChangeText] = useState("");
  const [chats, setChats] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigation = useNavigation();

  const updateChatList = (updatedChats: Chat[]) => {
    console.log("setting chats:", updatedChats);
    setChats(updatedChats);
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = await UserService.getCurrentUser();
      setCurrentUser(currentUser);
      await ChatService.getChatsForUser(currentUser, updateChatList);
    };

    getCurrentUser();
  }, []);

  function onAvatarPress() {
    navigation.navigate("UserProfileScreen");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("./../assets/images/voidColorWhite.png")}
        />
        <View style={styles.headerRight}>
          <View style={styles.headerTopRow}>
            <TouchableWithoutFeedback onPress={onAvatarPress}>
              <Image
                style={styles.userAva}
                source={
                  currentUser?.avaUrl
                    ? { uri: currentUser.avaUrl }
                    : require("./../assets/images/defaultAva.png")
                }
              />
            </TouchableWithoutFeedback>
            {UserService.currentUser?.isAdmin && (
              <IconButton
                style={styles.createChatButton}
                iconName="square-edit-outline"
                color={"white"}
                size={25}
                onPress={() => navigation.navigate("CreateChatScreen")}
              />
            )}
          </View>
          <TextInput
            style={styles.searchInput}
            onChangeText={onChangeText}
            value={text}
            placeholder="🔍 Search"
            placeholderTextColor={"#888a8f"}
            keyboardType="default"
          ></TextInput>
        </View>
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ChatComponent chat={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#1e1e20",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    width: "100%",
    backgroundColor: "#023750",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerRight: {
    backgroundColor: "#023750",
    justifyContent: "space-between",
    paddingRight: 15,
  },
  headerTopRow: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  logo: {
    marginLeft: 15,
    minHeight: 20,
    minWidth: 20,
    width: 110,
    height: 110,
    borderRadius: 999,
  },
  createChatButton: {
    marginLeft: 20,
    marginTop: 8,
  },
  searchInput: {
    borderRadius: 10,
    backgroundColor: "#243a44",
    color: "#888a8f",
    padding: 10,
    fontSize: 20,
    width: 240,
  },
  userAva: {
    minHeight: 20,
    minWidth: 20,
    width: 50,
    height: 50,
    alignSelf: "flex-end",
    borderRadius: 999,
  },
});
