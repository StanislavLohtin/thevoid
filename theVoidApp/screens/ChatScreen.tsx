import * as React from "react";
import { StyleSheet, Image, TextInput } from "react-native";

import { Text, View } from "../components/Themed";
import {Message} from "../components/Message";

export default function ChatScreen() {
  const [text, onChangeText] = React.useState(
    ""
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("./../assets/images/favicon.png")}
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
      <View style={styles.messages}>
        <Message id={1} name={"News Room"} avaUrl={"./../assets/images/ava2.png"} text={"Friday float specials!"} time={new Date(2021,8 ,20 ,9,40)} incoming={true}/>
        <Message id={2} name={"Titirangi Community Chat"} avaUrl={"./../assets/images/ava3.png"} text={"Ok, thanks!"} time={new Date(2021,8 ,20 ,9,25)} incoming={false}/>
        <Message id={3} name={"Support"} avaUrl={"./../assets/images/ava4.png"} text={"Ok, See you in Torrentz!"} time={new Date(2021,8 ,13 ,9,25)} incoming={false}/>
      </View>
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
    paddingVertical: 50,
    width: "100%",
    backgroundColor: "#023750",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerRight: {
    backgroundColor: "#023750",
    justifyContent: "space-between",
    paddingRight: 15
  },
  logo: {
    minHeight: 20,
    minWidth: 20,
    width: 120,
    height: 120,
  },
  messages: {
    backgroundColor: "#1e1e20"
  },
  searchInput: {
    borderRadius: 10,
    backgroundColor: "#243a44",
    color: "#888a8f",
    padding: 10,
    fontSize: 20,
    width: 240
  },
  userAva: {
    minHeight: 20,
    minWidth: 20,
    width: 40,
    height: 40,
    alignSelf: "flex-end"
  },
});
