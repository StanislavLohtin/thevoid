import * as React from 'react';
import {FlatList, Image, StyleSheet, TextInput} from 'react-native';
import {Text, View} from '../components/Themed';
import {Ionicons} from "@expo/vector-icons";
import UserService from "../services/UserService";
import {MemberComponent} from "../components/MemberComponent";

export default function MembersScreen() {
  const [text, onChangeText] = React.useState("");
  const users = UserService.users;

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}> Members </Text>
          <View style={styles.headerRight}>
            <Image
                style={styles.userAva}
                source={require("./../assets/images/ava1.png")}
            />
            <Ionicons size={30} style={styles.addPersonIcon} name={"ios-person-add"} />
          </View>
        </View>
        <View style={styles.members}><TextInput
            style={styles.searchInput}
            onChangeText={onChangeText}
            value={text}
            placeholder="🔍 Search"
            placeholderTextColor={"#888a8f"}
            keyboardType="default"
        >
        </TextInput></View>
        {/*<FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MemberComponent user={item} />}
        />*/}
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
    paddingRight: 15,
    flexDirection: "row",
  },
  addPersonIcon: {
    color: "#FFF",
    marginTop: 12,
    marginLeft: 25,
    fontSize: 24
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
    margin: 10
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
