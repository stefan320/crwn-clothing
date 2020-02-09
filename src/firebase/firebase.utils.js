import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCX9kQgdE3TGDOiMmm_GQfm5zL4uXbqS5o",
  authDomain: "crwn-db-f113e.firebaseapp.com",
  databaseURL: "https://crwn-db-f113e.firebaseio.com",
  projectId: "crwn-db-f113e",
  storageBucket: "crwn-db-f113e.appspot.com",
  messagingSenderId: "748382762515",
  appId: "1:748382762515:web:14792f651eff7a80a2f1e6"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
