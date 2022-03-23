import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;
import {getClientDuplicates, getClientFormulaNotes} from "./MindbodyUtil";

admin.initializeApp();

export const helloWorld = functions.https.onCall(() => {
  console.log("called helloWorld 1");
  functions.logger.info("Hello logs!!!!", {structuredData: true});
  return {data: "Hello from Firebase2222!"};
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

export const checkMindbodyAndRegister = functions.https.onCall(async (data) => {
  try {
    const mindbodyId = await getClientDuplicates(
      data.email,
      data.password,
      data.firstname,
      data.lastname
    );
    return createUser(
      data.email,
      data.password,
      data.firstname,
      data.lastname,
      mindbodyId
    );
  } catch (e) {
    throw new functions.https.HttpsError("aborted", e.toString());
  }
});

export const getMindbodyInfo = functions.https.onCall(async (data) => {
  console.log("called getMindbodyInfo 4!");
  return getClientFormulaNotes(data.mindbodyId);
});

const createUser = (
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  mindbodyId: string
): Promise<string> => {
  const displayName = `${firstname} ${lastname}`;
  return admin
    .auth()
    .createUser({
      email: email,
      emailVerified: false,
      password: password,
      displayName: displayName,
      disabled: false,
    })
    .then((userRecord) => {
      console.log("Successfully created new auth user:", userRecord.uid);
      return createDBUser(displayName, userRecord.uid, email, mindbodyId);
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
      return error.toString();
    });
};

const createDBUser = (
  displayName: string,
  uid: string,
  email: string,
  mindbodyId: string
) => {
  const newDBUser = {
    avaUrl: "",
    lastOnline: Timestamp.now(),
    status: "Hi there I am using Void!",
    username: displayName,
  };
  functions.logger.info("adding new db user:", newDBUser);
  return admin
    .firestore()
    .doc(`/users/${uid}`)
    .create(newDBUser)
    .then(() => {
      const newUserPrivateData = {
        email: email,
        createdAt: Timestamp.now(),
        chats: [],
        mindbodyId: mindbodyId,
        permissions: 0,
      };
      return admin
        .firestore()
        .doc(`/users/${uid}/private/data`)
        .create(newUserPrivateData);
    });
};
