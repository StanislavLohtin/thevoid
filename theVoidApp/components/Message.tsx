import * as React from 'react';
import {Text, TextProps} from './Themed';
import {Image, StyleSheet, View} from "react-native";

type MessageProps = TextProps & {
  id: number,
  name: string,
  avaUrl: string,
  text: string,
  time: Date,
  incoming: boolean
}

export function Message(props: MessageProps) {
  const ff2: string = props.avaUrl;
  const ff = "./../assets/images/ava3.png";
  return (
      <View style={styles.container}>
        <Image
            style={styles.userAva}
            source={require(ff)}
        />
        <Text style={styles.name}> {props.name} </Text>
        <Text> {props.text} </Text>

        <Text> {props.avaUrl} </Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#1e1e20",
    flexDirection: "row",
  },
  userAva: {
    minHeight: 20,
    minWidth: 20,
    width: 40,
    height: 40,
    alignSelf: "flex-end"
  },
  name: {
    color: "white",
    fontSize: 20
  }

});
