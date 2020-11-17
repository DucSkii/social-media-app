import firebase from "firebase"
// default snippet, get text from firebase config
firebase.initializeApp({
  apiKey: "AIzaSyCg3TjoSS4J-ESMwdjulxJZDboyYTSIVtk",
  authDomain: "social-media-69506.firebaseapp.com",
  databaseURL: "https://social-media-69506.firebaseio.com",
  projectId: "social-media-69506",
  storageBucket: "social-media-69506.appspot.com",
  messagingSenderId: "736193266324",
  appId: "1:736193266324:web:6248de2eb8664e96c96a81",
  measurementId: "G-BYVT1RFCEY"
})

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }