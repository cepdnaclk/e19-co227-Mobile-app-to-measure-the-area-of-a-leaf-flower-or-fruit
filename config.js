import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCF7cI_UZjnk9jAuDezt4vOjbC_XQ_3fnw",
  authDomain: "agrocam-7d76f.firebaseapp.com",
  projectId: "agrocam-7d76f",
  storageBucket: "agrocam-7d76f.appspot.com",
  messagingSenderId: "747129456769",
  appId: "1:747129456769:web:034c619f62cbe54336a580",
  measurementId: "G-CY9MKVD0KP"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};


/*import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDlwFQDD3QhwqaCcTHPxXEeUdw15_7v1-U",
  authDomain: "greenapp-d4938.firebaseapp.com",
  projectId: "greenapp-d4938",
  storageBucket: "greenapp-d4938.appspot.com",
  messagingSenderId: "105939413766",
  appId: "1:105939413766:web:c9cfcf99271d364dd9cc87",
  measurementId: "G-D28BWHGTCV",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();
export { db };*/


