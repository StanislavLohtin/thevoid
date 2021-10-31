import * as React from "react";
import { Text, TextProps } from "./Themed";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { Message } from "../classes/Message";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { defPurple } from "../constants/Colors";

type MessageProps = TextProps & {
  message: Message;
  onOptionSelect: (string) => void;
};

export function MessageComponent(props: MessageProps) {
  const msg = props.message;

  function onOptionSelect(option) {
    console.log("selected", option);
    props.onOptionSelect(option);
  }

  return (
    <View
      style={[
        styles.message,
        msg.sentByCurrentUser() ? styles.outcoming : styles.incoming,
      ]}
    >
      <View>
        <Text style={styles.text}>
          {(msg.content + "           ").padEnd(20)}
          {msg.options?.length ? (
            <View style={styles.optionList}>
              <FlatList
                data={msg.options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Text
                    style={styles.option}
                    onPress={() => onOptionSelect(item)}
                  >
                    {item}
                  </Text>
                )}
              />
            </View>
          ) : (
            ""
          )}
        </Text>
        <View style={styles.timeContainer}>
          <Text style={styles.createdAt}>{msg.createdAtShort}</Text>
          {msg.sentByCurrentUser() && (
            <MaterialCommunityIcons
              style={styles.statusIcon}
              name={msg.getIconName()}
              size={10}
              color={msg.getIconColor()}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    borderRadius: 15,
    backgroundColor: defPurple,
    marginBottom: 6,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 4,
  },
  incoming: {
    backgroundColor: defPurple,
    marginRight: 70,
    alignSelf: "flex-start",
  },
  outcoming: {
    backgroundColor: "#2e2e30",
    marginLeft: 70,
    alignSelf: "flex-end",
  },
  timeContainer: {
    position: "absolute",
    right: 2,
    fontSize: 10,
    bottom: -3,
    flexDirection: "row",
  },
  createdAt: {
    color: "lightgrey",
    fontSize: 11,
    marginRight: 2,
  },
  statusIcon: {
    marginTop: 3,
  },
  name: {
    color: "white",
    fontSize: 16,
  },
  text: {
    color: "white",
    fontSize: 14,
    paddingRight: 5,
  },
  optionList: {
    display: "flex",
  },
  option: {
    backgroundColor: "#2e2e30",
    borderRadius: 10,
    fontSize: 14,
    alignSelf: "flex-start",
    margin: 3,
    paddingTop: 2,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 2,
    color: "white",
  },
});
