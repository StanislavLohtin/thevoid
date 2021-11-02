import * as React from "react";
import { Text, TextProps } from "./Themed";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { UserPublic } from "../classes/UserPublic";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {defPurple} from "../constants/Colors";

type MemberProps = TextProps & {
  user: UserPublic;
  onTouchUserFn: (UserPublic) => void;
};

export function UserInAListComponent(props: MemberProps) {
  const [isSelected, setIsSelected] = React.useState(false);
  const user = props.user;
  const onTouchUser = () => {
    setIsSelected(!isSelected);
    props.onTouchUserFn(user);
  };

  return (
    <TouchableWithoutFeedback onPress={onTouchUser}>
      <View style={styles.container}>
        <Image
          style={styles.userAva}
          source={
            user?.avaUrl
              ? { uri: user.avaUrl }
              : require("./../assets/images/defaultAva.png")
          }
        />
        <Text style={styles.name}> {user.username} </Text>
        {isSelected && (
          <MaterialCommunityIcons
            style={styles.selectionIcon}
            name={"check-circle-outline"}
            size={30}
            color={"white"}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "transparent",
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
    width: "100%",
  },
  text: {
    color: "grey",
    fontSize: 13,
  },
  selectionIcon: {
    color: defPurple,
  },
});
