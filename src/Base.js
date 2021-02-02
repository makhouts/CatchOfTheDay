import Rebase from 're-base';
import firebase from 'firebase';

export const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyAWgomjGXxuQdlqg7Qc_Rd2y5mENNn4kzM",
        authDomain: "catchoftheday-2b153.firebaseapp.com",
        databaseURL: "https://catchoftheday-2b153.firebaseio.com",
      }
);

const base = Rebase.createClass(firebaseApp.database());

export default base;