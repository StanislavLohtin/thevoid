import * as React from "react";
import { Text, TextProps } from "./Themed";
import { Image, StyleSheet, View } from "react-native";
import {Message} from "../classes/Message";

type MemberProps = TextProps & {
  message: Message;
};

export function MemberComponent(props: MemberProps) {
  const msg = props.message;
  function ellipsis(text: string) {
    return text.length <= 38 ? text : text.substr(0, 35) + "...";
  }

  return (
    <View style={styles.container}>
      <Image style={styles.userAva} source={{ uri: "" + msg.sender.avaUrl }} />
      <Text style={styles.name}> {msg.sender.name} </Text>
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
    marginTop: 15,
    borderBottomColor: "rgba(200, 200, 200, 0.2)",
    borderBottomWidth: 0.3,
    width: "100%"
  },
  text: {
    color: "grey",
    fontSize: 13,
  },
});
