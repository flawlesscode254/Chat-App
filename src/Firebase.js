import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBvkrt0q_9ewVGGaaqq42GutWZ4bSzzblU",
  authDomain: "chat-app-dd4b6.firebaseapp.com",
  projectId: "chat-app-dd4b6",
  storageBucket: "chat-app-dd4b6.appspot.com",
  messagingSenderId: "363132941775",
  appId: "1:363132941775:web:c9950a4913b88f19734eba",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
