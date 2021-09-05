import * as React from "react";
import { StyleSheet, Image, TextInput, FlatList } from "react-native";
import { View, Text } from "../components/Themed";
import { MessageComponent } from "../components/MessageComponent";
import { MessageDTO } from "../classes/MessageDTO";
import { Message } from "../classes/Message";
import firebase from "firebase";

async function fetchMessages(messages: Message[]) {
  const data = await firebase.database().ref("/messages").get();
  data.forEach((message) => {
    const newMessage = new Message(message.toJSON() as unknown as MessageDTO);
    if (newMessage.sentByCurrentUser() || newMessage.receivedByCurrentUser()) {
      messages.push(newMessage);
    }
  });
}

export default function ChatListScreen() {
  const [text, onChangeText] = React.useState("");
  const messages: Message[] = [];
  fetchMessages(messages);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("./../assets/images/voidColorWhite.png")}
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
            placeholderTextColor={"#888a8f"}
            keyboardType="default"
          ></TextInput>
        </View>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MessageComponent message={item} />}
      />
    </View>
  );
}

/*function storeHighScore(userId, score) {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      highscore: score,
    });
}*/

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
