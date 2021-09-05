import * as React from "react";
import { Text, TextProps } from "./Themed";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Chat } from "../classes/Chat";

type ChatProps = TextProps & {
  chat: Chat;
};

export function ChatComponent(props: ChatProps) {
  const chat = props.chat;
  console.warn("CHAT");
  console.warn(chat);
  const navigation = useNavigation();
  const user = chat.user;
  console.warn("USER");
  console.warn(user);

  function onChatClick() {
    navigation.navigate("ChatScreen", { id: chat.userId });
  }

  return (
    <TouchableWithoutFeedback onPress={onChatClick}>
      <View style={styles.container}>
        <Image
          style={styles.userAva}
          source={{ uri: "" + chat.user?.avaUrl }}
        />
        <View>
          <Text style={styles.name}> {chat.user?.name} </Text>
          <Text style={styles.text}>
            {" "}
            {ellipsis(
              (chat.lastMessage?.sentByCurrentUser() ? "" : "You: ") +
                chat.lastMessage?.content
            )}{" "}
            · {chat.lastMessage?.createdAt.toLocaleTimeString()}
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
