import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
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
      admin.firestore().doc(`/chats/${context.params.chatId}`)
          .update("lastMessageId", context.params.messageId);
      return snapshot.ref.update({
        createdAt: Timestamp.now(),
        status: 1,
        // sender: context.auth!.uid,
      });
    });
