import * as React from "react";
import { StyleSheet, Image, TextInput } from "react-native";
import { View } from "../components/Themed";
import { MessageComponent } from "../components/MessageComponent";
import {MessageDTO} from "../classes/MessageDTO";
import {Message} from "../classes/Message";

export default function ChatScreen() {
  const [text, onChangeText] = React.useState("");
  const avaUrl = [
    "data:image/png;base64,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",
  ];
  const messagesJson: {messages: MessageDTO[]} = require("./../assets/messages.json");
  console.warn(messagesJson);

  const messageViews = [];
  for (let message of messagesJson.messages) {
    messageViews.push(<MessageComponent message={new Message(message)} key={message.id} />);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("./../assets/images/logo.png")}
        />
        <View style={styles.headerRight}>
          <Image
            style={styles.userAva}
            source={require("./../assets/images/ava1.png")}
          />
          <TextInput
            style={styles.searchInput}
            onChangeText={onChangeText}
            value={text}
            placeholder="🔍 Search"
            keyboardType="default"
          >
          </TextInput>
        </View>
      </View>
      <View style={styles.messages}>{messageViews}</View>
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
  logo: {
    minHeight: 20,
    minWidth: 20,
    width: 120,
    height: 120,
    borderRadius: 999,
  },
  messages: {
    backgroundColor: "#1e1e20",
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
