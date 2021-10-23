import * as React from "react";
import { Text, TextProps } from "./Themed";
import { Image, StyleSheet, View } from "react-native";
import { CurrentUser } from "../classes/CurrentUser";
import firebase from "firebase";
import {UserPublic} from "../classes/UserPublic";

type MemberProps = TextProps & {
  user: UserPublic;
};

export function MemberComponent(props: MemberProps) {

  const [avaUrl, setAvaUrl] = React.useState("");

  const user = props.user;

/*  const storageRef = firebase.storage().ref();

  const imagesRef = storageRef.child("avatars");
  const avaRef = imagesRef.child(user.id + ".png");
  avaRef.getDownloadURL().then((url) => {
    setAvaUrl(url);
  });*/

  return (
    <View style={styles.container}>
      <Image style={styles.userAva} source={{ uri: user.avaUrl }} />
      <Text style={styles.name}> {user.username} </Text>
      <Text style={styles.text}> id: {user.id} </Text>
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
    width: "100%",
  },
  text: {
    color: "grey",
    fontSize: 13,
  },
});
