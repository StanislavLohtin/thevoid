import * as React from "react";
import { Image, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { MessageDTO } from "../classes/MessageDTO";
import { MemberComponent } from "../components/MemberComponent";
import { Message } from "../classes/Message";
import { Ionicons } from "@expo/vector-icons";

export default function ExploreScreen() {
  const [text, onChangeText] = React.useState("");
  const membersJson: {
    messages: MessageDTO[];
  } = require("./../assets/messages.json");
  console.info(membersJson);

  const messageViews = [];
  for (let message of membersJson.messages) {
    messageViews.push(
      <MemberComponent message={new Message(message)} key={message.id} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Explore The Void </Text>
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangeText}
          value={text}
          placeholder="🔍 Search"
          keyboardType="default"
        >
        </TextInput>
      </View>
      <View style={styles.groups}>
        <Text style={styles.activeGroup}>ALL</Text>
        <Text style={styles.group}>COMMUNITIES</Text>
      </View>
      <View style={styles.members}>{messageViews}</View>
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
    fontSize: 34,
    color: "#fff",
  },
  groups: {
    fontSize: 25,
    backgroundColor: "#2d2233",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  activeGroup: {
    backgroundColor: "#6b4ffa",
    width: "40%",
    borderRadius: 15,
    textAlign: "center",
    padding: 5,
    color: "#FFF",
    marginLeft: 20
  },
  group: {
    backgroundColor: "#2c2232",
    width: "40%",
    borderRadius: 15,
    textAlign: "center",
    padding: 5,
    color: "#FFF",
    marginRight: 20
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    width: "100%",
    backgroundColor: "#3c2643",
    justifyContent: "space-between",
  },
  headerRight: {
    backgroundColor: "#023750",
    paddingRight: 15,
    flexDirection: "row",
  },
  addPersonIcon: {
    color: "#FFF",
    marginTop: 12,
    marginLeft: 25,
    fontSize: 24,
  },
  members: {
    backgroundColor: "#1e1e20",
  },
  searchInput: {
    borderRadius: 10,
    backgroundColor: "#243a44",
    color: "#888a8f",
    padding: 10,
    fontSize: 20,
    width: "95%",
    margin: 10,
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
