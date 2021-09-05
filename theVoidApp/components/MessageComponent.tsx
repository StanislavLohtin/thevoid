import * as React from "react";
import { Text, TextProps } from "./Themed";
import { Image, StyleSheet, View } from "react-native";
import {Message} from "../classes/Message";

type MessageProps = TextProps & {
  message: Message;
};

export function MessageComponent(props: MessageProps) {
  const msg = props.message;
  function ellipsis(text: string) {
    return text.length <= 38 ? text : text.substr(0, 35) + "...";
  }

  return (
    <View style={styles.container}>
      <Image style={styles.userAva} source={{ uri: "" + msg.sender.avaUrl }} />
      <View>
        <Text style={styles.name}> {msg.sender.name} </Text>
        <Text style={styles.text}>
          {" "}
          {ellipsis((msg.sentByCurrentUser() ? "" : "You: ") + msg.content)} ·{" "}
          {msg.createdAt.toLocaleTimeString()}
        </Text>
      </View>
      <Text> {msg.status} </Text>
    </View>
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
