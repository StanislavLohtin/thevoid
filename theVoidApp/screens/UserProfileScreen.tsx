import * as React from "react";
import { StyleSheet, Image, Button, Alert } from "react-native";
import { View, Text } from "../components/Themed";
import UserService from "../services/UserService";
import { logout } from "../components/Firebase/firebase";
import { darkerPurple } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/IconButton";

export default function UserProfileScreen() {
  const user = UserService.currentUser;
  const navigation = useNavigation();

  function onLogoutPress() {
    logout();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          style={styles.button}
          iconName="chevron-left"
          color={darkerPurple}
          size={42}
          onPress={() => navigation.goBack()}
        />
        <Image style={styles.userAva} source={{ uri: user.avaUrl }} />
      </View>
      <Text> {user.username} </Text>
      <Text> {user.email} </Text>
      <Text> "{user.status}" </Text>
      <Button title={"logout"} onPress={onLogoutPress} />
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
  button: {},
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
