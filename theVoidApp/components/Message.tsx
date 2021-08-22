import * as React from 'react';
import {Text, TextProps} from './Themed';
import {Image, StyleSheet, View} from "react-native";

type MessageProps = TextProps & {
  id: number,
  name: string,
  avaUrl: string,
  text: string,
  time: Date,
  incoming: boolean,
  status?: string
}

export function Message(props: MessageProps) {

  function ellipsis(text: string) {
    return text.length <= 43 ? text : text.substr(0, 40) + "...";
  }

  return (
      <View style={styles.container}>
        <Image
            style={styles.userAva}
            source={{uri: "" + props.avaUrl}}
        />
        <View>
          <Text style={styles.name}> {props.name} </Text>
          <Text style={styles.text}> {ellipsis((props.incoming ? "" : "You: ") + props.text)} · {props.time.toLocaleTimeString()}</Text>
        </View>
        <Text> {props.status} </Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#1e1e20",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15
  },
  userAva: {
    minHeight: 50,
    minWidth: 50,
    width: 60,
    height: 60,
    alignSelf: "flex-end",
    borderRadius: 999,
    marginRight: 10
  },
  name: {
    color: "white",
    fontSize: 16
  },
  text: {
    color: "grey",
    fontSize: 13
  }

});
