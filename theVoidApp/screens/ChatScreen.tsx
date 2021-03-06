import * as React from "react";
import { useEffect } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
} from "react-native";
import { Text, View } from "../components/Themed";
import { MessageComponent } from "../components/MessageComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserService from "../services/UserService";
import MessageService from "../services/MessageService";
import IconButton from "../components/IconButton";
import { darkerPurple } from "../constants/Colors";
import ChatService from "../services/ChatService";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../types";
import FirebaseService from "../services/FirebaseService";

export default function ChatScreen() {
  console.log("entering ChatScreen")
  const [text, setText] = React.useState("");
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const chat = UserService.currentUser.getChatById(
    (route.params as { id: string }).id
  );

  const [messages, setMessages] = React.useState(
    chat.lastMessage ? [chat.lastMessage] : []
  );

  useEffect(() => {
    const fetchMessages = async () => {
      MessageService.fetchRecentMessagesFromChat(chat, () => {
        console.log("setting messages:", chat.messages);
        setMessages([...chat.messages].reverse());
      });
    };
    ChatService.currentChatId = chat.id;
/*    if (chat.type === ChatType.COURSE) {
      FlowService.openSocketForChat(chat);
    }*/

    fetchMessages();
    return () => {
      ChatService.currentChatId = undefined;
      FirebaseService.stopOnChangeListener();
    };
  }, []);

  function onSendPress() {
    const newMessage = MessageService.buildMessage(chat, text);
    // chat.messages.push(newMessage);
    // setMessages(chat.messages);
    setText("");
    /*if (chat.type === ChatType.COURSE) {
      FlowService.sendMessage(chat, text);
    }*/
    MessageService.sendMessage(chat, newMessage);
  }

  function onOptionSelect(option: string) {
    setText(option);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require("./../assets/images/chatBg.png")}
      >
        <View style={styles.header}>
          <IconButton
            style={styles.button}
            iconName="chevron-left"
            color={darkerPurple}
            size={42}
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
        <View style={styles.content}>
          <FlatList
            style={styles.messageList}
            data={messages}
            inverted
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MessageComponent
                message={item}
                key={item.id}
                onOptionSelect={onOptionSelect}
              />
            )}
          />
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
              placeholder="Enter text"
              placeholderTextColor={"#888a8f"}
              keyboardType="default"
            ></TextInput>
            <IconButton
              style={styles.sendButton}
              iconName="menu-right"
              color={darkerPurple}
              size={50}
              onPress={onSendPress}
            />
          </View>
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
    justifyContent: "space-between",
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
  button: {},
  sendButton: {
    maxHeight: 26,
    maxWidth: 40,
    top: -12,
  },
  messageList: {
    // maxHeight: "calc(100vh - 140px)",
    backgroundColor: "transparent",
  },
  header: {
    paddingTop: 45,
    paddingBottom: 10,
    backgroundColor: "transparent",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  logo: {
    marginLeft: 15,
    minHeight: 20,
    minWidth: 20,
    width: 110,
    height: 110,
    borderRadius: 999,
  },
  input: {
    borderRadius: 20,
    backgroundColor: "#1e1e20",
    color: "white",
    fontSize: 15,
    width: "90%",
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 8,
  },
  inputRow: {
    backgroundColor: "#2e2e30",
    paddingTop: 7,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userAva: {
    minHeight: 20,
    minWidth: 20,
    width: 40,
    height: 40,
    alignSelf: "flex-end",
    borderRadius: 999,
  },
});
