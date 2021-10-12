import * as React from "react";
import { StyleSheet, Image, TextInput, FlatList, Button } from "react-native";
import { Text, View } from "../components/Themed";
import { MessageComponent } from "../components/MessageComponent";
import { MessageDTO } from "../classes/MessageDTO";
import { Message } from "../classes/Message";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserService from "../services/UserService";
import FirebaseService from "../services/FirebaseService";
import { useEffect } from "react";
import ChatService from "../services/ChatService";
import MessageService from "../services/MessageService";
import Colors from "../utils/colors";
import IconButton from "../components/IconButton";

export default function ChatScreen() {
  const [text, setText] = React.useState("");
  const route = useRoute();
  const navigation = useNavigation();
  const chat = UserService.currentUser.getChatById(
    (route.params as { id: string }).id
  );

  const [messages, setMessages] = React.useState([chat.lastMessage]);

  useEffect(() => {
    const fetchMessages = async () => {
      MessageService.fetchRecentMessagesFromChat(chat, () => {
        console.warn("setting messages:", chat.messages);
        setMessages(chat.messages);
      });
    };

    fetchMessages();
  }, []);

  function onSendPress() {
    const newMessage = MessageService.buildMessage(chat, text);
    // chat.messages.push(newMessage);
    // setMessages(chat.messages);
    setText("");
    MessageService.sendMessage(chat, newMessage);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          style={styles.backButton}
          iconName="keyboard-backspace"
          color={Colors.white}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Image
          style={styles.userAva}
          source={
            chat.otherUser?.avaUrl
              ? { uri: chat.otherUser.avaUrl }
              : require("./../assets/images/defaultAva.png")
          }
        />
        <Text style={styles.title}> {chat.otherUser.username} </Text>
      </View>
      <FlatList
        data={messages}
        extraData={setMessages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MessageComponent message={item} key={item.id} />}
      />
      <TextInput
        style={styles.searchInput}
        onChangeText={setText}
        value={text}
        placeholder="Enter text"
        placeholderTextColor={"#888a8f"}
        keyboardType="default"
      ></TextInput>
      <Button title={"send"} onPress={onSendPress} />
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
  backButton: {
    marginVertical: 10,
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
  logo: {
    marginLeft: 15,
    minHeight: 20,
    minWidth: 20,
    width: 110,
    height: 110,
    borderRadius: 999,
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
