import * as React from "react";
import { StyleSheet, Image, TextInput, FlatList, Button } from "react-native";
import { View } from "../components/Themed";
import { MessageComponent } from "../components/MessageComponent";
import { MessageDTO } from "../classes/MessageDTO";
import { Message } from "../classes/Message";
import { useRoute } from "@react-navigation/native";
import { UserService } from "../services/UserService";
import { FirebaseService } from "../services/FirebaseService";

export default function ChatScreen() {
  const [text, onChangeText] = React.useState("");
  const route = useRoute();
  const user = UserService.getById(Number((route.params as { id: string }).id));

  function onSendPress() {
    const newMessageDTO: MessageDTO = {
      createdAt: Date.now().toLocaleString(),
      content: text,
      sender: UserService.getCurrentUserId().toString(),
      receiver: user.id.toString(),
      status: "0",
    };
    FirebaseService.push("/messages", newMessageDTO).then(
      (id) => {
        if (!id.key) {
          console.error("create failed");
          return;
        }
        const newMessage = new Message(newMessageDTO, id.key);
        user.messages?.push(newMessage);
        UserService.getAllMessages().push(newMessage);
      },
      (e) => {
        console.error("send message failed!!");
        console.error(e);
      }
    );
    onChangeText("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.userAva}
          source={require("./../assets/images/ava1.png")}
        />
      </View>
      <FlatList
        data={user.messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MessageComponent message={item} />}
      />
      <TextInput
        style={styles.searchInput}
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter text"
        placeholderTextColor={"#888a8f"}
        keyboardType="default"
      ></TextInput>
      <Button title={"send"} onPress={onSendPress} />
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
