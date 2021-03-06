import * as React from "react";
import { ImageBackground, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import UserService from "../services/UserService";
import { MessageComponent } from "../components/MessageComponent";

export default function ExploreScreen() {
  const [text, onChangeText] = React.useState("");
  const messageViews = [];
  /* for (let message of UserService.getAllMessages()) {
    messageViews.push(
      <MessageComponent message={message} key={message.id} />
    );
  }*/

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require("./../assets/images/exploreBg.png")}
      >
        <View style={styles.header}>
          <Text style={styles.title}> Explore The Void </Text>
          <TextInput
            style={styles.searchInput}
            onChangeText={onChangeText}
            value={text}
            placeholder="Search"
            placeholderTextColor={"#888a8f"}
            keyboardType="default"
          ></TextInput>
        </View>
        <View style={styles.groups}>
          <Text style={[styles.group, styles.activeGroup]}>ALL</Text>
          <Text style={styles.group}>COMMUNITIES</Text>
        </View>
        <View style={styles.members}>{messageViews}</View>
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
  },
  title: {
    fontSize: 34,
    color: "#fff",
  },
  groups: {
    fontSize: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  activeGroup: {
    backgroundColor: "#6b4ffa",
  },
  group: {
    width: "40%",
    borderRadius: 15,
    textAlign: "center",
    padding: 5,
    color: "#FFF",
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    width: "100%",
    backgroundColor: "transparent",
    justifyContent: "space-between",
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
});
