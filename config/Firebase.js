import * as firebase from "firebase"
import "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyChCh5yk9aA7RHHq2zLGBPdUGIZijIU8QI",
    authDomain: "fir-e8e67.firebaseapp.com",
    databaseURL: "https://fir-e8e67.firebaseio.com",
    projectId: "fir-e8e67",
    storageBucket: "fir-e8e67.appspot.com",
    messagingSenderId: "664001839314",
    appId: "1:664001839314:web:88462239bf6bc3872c6d0b",
    measurementId: "G-T1EX06NS5N"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;