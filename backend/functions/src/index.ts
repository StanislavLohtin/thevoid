import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;
import {RequestInfo, RequestInit} from "node-fetch";

const BASE_URL = "https://api.mindbodyonline.com/public/v6";
const API_KEY = "91504ccb30ab411d95533a3535a18d5b";
const SITE_ID = "-99";
let mindbodyToken: string;
let mindbodyOptions: {
  method: string;
  headers: {"Api-Key": string; authorization: string; SiteId: string};
};

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({default: fetch}) => fetch(url, init));

admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  console.log("called helloWorld 1");
  functions.logger.info("Hello logs!!!!", {structuredData: true});
  response.send({data: "Hello from Firebase2222!"});
});

export const onUserCreated = functions.auth.user().onCreate((user) => {
  const newUser = {
    avaUrl: "",
    lastOnline: Timestamp.now(),
    status: "Hi there I am using Void!",
    username: user.displayName || "no name",
    private: {
      email: user.email,
      createdAt: Timestamp.now(),
      chats: [],
      mindbodyId: "no mindbody id yet",
      permissions: 0,
    },
  };
  functions.logger.info("adding new user:", newUser);
  return admin.firestore().doc("/users").create(newUser);
});

export const onMessageAdd = functions.firestore
  .document("chats/{chatId}/messages/{messageId}")
  .onCreate((snapshot, context) => {
    const newMsg = snapshot.data();
    functions.logger.info("adding new msg:", newMsg, snapshot, context);
    admin
      .firestore()
      .doc(`/chats/${context.params.chatId}`)
      .update("lastMessageId", context.params.messageId);
    return snapshot.ref.update({
      createdAt: Timestamp.now(),
      status: 1,
      // sender: context.auth!.uid,
    });
  });

export const getMindbodyInfo = functions.https.onRequest(async (req, res) => {
  console.log("called getMindbodyInfo 3");
  functions.logger.info("Calling getMindbodyInfo3!");
  return getToken().then(() => {
    res.send({data: "mindbodyToken:" + mindbodyToken});
    functions.logger.info("found token:", mindbodyToken);
    functions.logger.info("new mindbodyOptions:", mindbodyOptions);
  });
});

const getToken = (): Promise<unknown> => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": "91504ccb30ab411d95533a3535a18d5b",
      SiteId: "-99",
    },
    body: JSON.stringify({
      Username: "Siteowner",
      Password: "apitest1234",
    }),
  };
  return fetchFn(`${BASE_URL}/usertoken/issue`, options).then(
    (responseBody: {AccessToken: string}) => {
      mindbodyToken = responseBody.AccessToken;
      mindbodyOptions = {
        method: "GET",
        headers: {
          "Api-Key": API_KEY,
          authorization: mindbodyToken,
          SiteId: SITE_ID,
        },
      };
    }
  );
};

const fetchFn = (
  url: RequestInfo,
  options: RequestInit | undefined
): Promise<any> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res, rej) => {
    try {
      console.log("fetch inside!:", url, options);
      const response = await fetch(url, options);
      if (!response.ok) {
        console.log("ERROR! :", response);
        rej(response.status);
        return;
      }
      const bodyObj = await response.json();
      console.log("response body:", bodyObj);
      res(bodyObj);
    } catch (e) {
      console.warn("catching!");
      console.warn(e);
      rej(e);
    }
  });
};
