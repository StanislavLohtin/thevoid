import * as React from "react";
import {
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  FlatList,
} from "react-native";
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
  const [formulaNotes, setFormulaNotes] = React.useState([]);
  const [contracts, setContracts] = React.useState([]);
  const [purchases, setPurchases] = React.useState([]);
  const [visits, setVisits] = React.useState([]);
  const user = UserService.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    /*MindbodyService.getClientFormulaNotes().then((clientFormulaNotes) => {
      setFormulaNotes(clientFormulaNotes);
    });

    MindbodyService.getClientContracts().then((clientContracts) => {
      setContracts(clientContracts);
    });

    MindbodyService.getClientPurchases().then((clientPurchases) => {
      setPurchases(clientPurchases);
    });

    MindbodyService.getClientVisits().then((clientVisits) => {
      setVisits(clientVisits);
    });

    MindbodyService.getClients().then((clientVisits) => {
      // @ts-ignore
      window.clients = clientVisits;
    });*/
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
              <Text style={styles.subtitle}>Liability waver signed</Text>
              <Text style={styles.subtitle}>Formula notes</Text>
              {formulaNotes.length ? (
                <FlatList
                  data={formulaNotes}
                  renderItem={({ item }) => <Text>{item.Note}</Text>}
                />
              ) : (
                <Text>No notes yet</Text>
              )}
              <Text style={styles.subtitle}>Mindbody account</Text>
            </View>
          </TabView.Item>
          <TabView.Item style={styles.tabViewItem}>
            <View style={styles.tabContent}>
              <Text style={styles.subtitle}>Contracts</Text>
              {contracts.length ? (
                <FlatList
                  data={contracts}
                  renderItem={({ item }) => <Text>{item.ContractName}</Text>}
                />
              ) : (
                <Text>No contracts purchased</Text>
              )}
              <Text style={styles.subtitle}>Purchases</Text>
              {purchases.length ? (
                <FlatList
                  data={purchases}
                  renderItem={({ item }) => <Text>{item.Description}</Text>}
                />
              ) : (
                <Text>No purchases yet</Text>
              )}
            </View>
          </TabView.Item>
          <TabView.Item style={styles.tabViewItem}>
            <View style={styles.tabContent}>
              <Text style={styles.subtitle}>Upcoming visits</Text>
              <Text style={styles.subtitle}>Visit history</Text>
              {visits.length ? (
                <FlatList
                  data={visits}
                  renderItem={({ item }) => <Text>{item.Name}</Text>}
                />
              ) : (
                <Text>No visits yet</Text>
              )}
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
  tabBar: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 10,
  },
  tabItem: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: 15,
    padding: 0,
  },
  tabItemTitle: {
    color: "white",
    fontSize: 12,
    padding: 0,
  },
  tabItemBackground: {
    backgroundColor: "transparent",
    borderRadius: 15,
    padding: 0,
    margin: 13,
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
  subtitle: {
    color: "#72717f",
    textTransform: "uppercase",
  },
  text: {
    color: "white",
  },
});
