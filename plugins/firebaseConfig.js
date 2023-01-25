import firebase from "firebase/compat/app";
import "firebase/compat/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbChWC_eDaiL2dlSjlaf3KCCAsVWnzYOQ",
  authDomain: "edenmedia-mpnd.firebaseapp.com",
  databaseURL: "https://edenmedia-mpnd-default-rtdb.firebaseio.com",
  projectId: "edenmedia-mpnd",
  storageBucket: "edenmedia-mpnd.appspot.com",
  messagingSenderId: "1081572057276",
  appId: "1:1081572057276:web:e546deb80de4a7f9b2b0b9",
  measurementId: "G-QS57WSRJMB"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.database();
