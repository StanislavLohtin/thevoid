import * as React from "react";
import { Text, TextProps } from "./Themed";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Chat, ChatType } from "../classes/Chat";
import { useEffect } from "react";
import ChatService from "../services/ChatService";
import { useState } from "react";

type ChatProps = TextProps & {
  chat: Chat;
};

export function ChatComponent(props: ChatProps) {
  const chat = props.chat;
  const [lastMessage, setLastMessage] = useState(chat.lastMessage);
  const navigation = useNavigation();
  const otherUser = chat.otherUser;

  useEffect(() => {
    ChatService.watchLastMessageOfAChat(chat.id, setLastMessage, navigation);
  });

  function onChatClick() {
    navigation.navigate("ChatScreen", { id: chat.id });
  }

  let avaUrl = require("./../assets/images/defaultAva.png");
  if (chat.type === ChatType.PRIVATE) {
    if (otherUser?.avaUrl) {
      avaUrl = { uri: otherUser.avaUrl };
    }
  } else if (chat.chatImage) {
    avaUrl = { uri: chat.chatImage };
  }

  return (
    <TouchableWithoutFeedback onPress={onChatClick}>
      <View style={styles.container}>
        <Image style={styles.userAva} source={avaUrl} />
        <View>
          <Text style={styles.name}>
            {chat.type === ChatType.PRIVATE ? otherUser?.username : chat.title}
          </Text>
          <Text style={styles.text}>
            {lastMessage
              ? ellipsis(
                  (lastMessage?.sentByCurrentUser() ? "You: " : "") +
                    lastMessage?.content
                ) +
                " · " +
                lastMessage?.createdAt.toLocaleTimeString()
              : "No messages yet."}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#1e1e20",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  userAva: {
    minHeight: 50,
    minWidth: 50,
    width: 60,
    height: 60,
    alignSelf: "flex-end",
    borderRadius: 999,
    marginRight: 10,
  },
  name: {
    color: "white",
    fontSize: 16,
  },
  text: {
    color: "grey",
    fontSize: 13,
  },
});

function ellipsis(text: string) {
  return text.length <= 38 ? text : text.substr(0, 35) + "...";
}
