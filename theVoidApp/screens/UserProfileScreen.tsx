import * as React from "react";
import { StyleSheet, Image, Button, ImageBackground } from "react-native";
import { View, Text } from "../components/Themed";
import UserService from "../services/UserService";
import { logout } from "../components/Firebase/firebase";
import { darkerPurple } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/IconButton";
import MindbodyService from "../services/MindbodyService";
import { useEffect } from "react";
import { Tab, TabView } from "react-native-elements";

export default function UserProfileScreen() {
  const [index, setIndex] = React.useState(0);
  const user = UserService.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    // MindbodyService.getClientPurchases();
  }, []);

  function onLogoutPress() {
    logout();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require("./../assets/images/profileBg.png")}
      >
        <IconButton
          style={styles.backButton}
          iconName="chevron-left"
          color={darkerPurple}
          size={42}
          onPress={() => navigation.goBack()}
        />
        <Image style={styles.userAva} source={{ uri: user.avaUrl }} />
        <Text style={styles.title}> {user.username} </Text>
        <Tab value={index} onChange={setIndex} disableIndicator>
          <Tab.Item
            title="profile"
            containerStyle={styles.tabItemBackground}
            buttonStyle={[
              styles.tabItem,
              index === 0 ? styles.activeTab : null,
            ]}
            titleStyle={styles.tabItemTitle}
          />
          <Tab.Item
            titleStyle={styles.tabItemTitle}
            title="account"
            containerStyle={styles.tabItemBackground}
            buttonStyle={[
              styles.tabItem,
              index === 1 ? styles.activeTab : null,
            ]}
          />
          <Tab.Item
            title="schedule"
            containerStyle={styles.tabItemBackground}
            buttonStyle={[
              styles.tabItem,
              index === 2 ? styles.activeTab : null,
            ]}
            titleStyle={styles.tabItemTitle}
          />
        </Tab>

        <TabView value={index} onChange={setIndex}>
          <TabView.Item style={styles.tabViewItem}>
            <View style={styles.tabContent}>
              <Text style={styles.text}>Liability waver signed</Text>
            </View>
          </TabView.Item>
          <TabView.Item style={styles.tabViewItem}>
            <View style={styles.tabContent}>
              <Text style={styles.text}>Contracts</Text>
            </View>
          </TabView.Item>
          <TabView.Item style={styles.tabViewItem}>
            <View style={styles.tabContent}>
              <Text style={styles.text}>Upcoming visits</Text>
              <Text style={styles.text}>Visit history</Text>
            </View>
          </TabView.Item>
        </TabView>

        <Button title={"logout"} onPress={onLogoutPress} color={"#6b4ffa"} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    margin: 10,
    color: "white",
    alignSelf: "center",
  },
  bg: {
    flex: 1,
    flexDirection: "column",
  },
  backButton: {
    marginTop: 50,
  },
  tabItem: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: 15,
    padding: 0,
  },
  tabItemTitle: {
    color: "white",
    fontSize: 13,
    padding: 0,
  },
  tabItemBackground: {
    backgroundColor: "transparent",
    padding: 0,
  },
  activeTab: {
    backgroundColor: "#6b4ffa",
  },
  tabViewItem: {
    width: "100%",
    padding: 20,
  },
  tabContent: {
    backgroundColor: "transparent",
  },
  userAva: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 999,
    marginTop: -55,
  },
  text: {
    color: "#72717f",
    textTransform: "uppercase",
  },
});
