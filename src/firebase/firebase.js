import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB1GBBO4ihWNMJI4i6HNAOM3Q34uMir94g",
    authDomain: "budgetapp-10129.firebaseapp.com",
    databaseURL: "https://budgetapp-10129.firebaseio.com",
    projectId: "budgetapp-10129",
    storageBucket: "budgetapp-10129.appspot.com",
    messagingSenderId: "243042732256",
    appId: "1:243042732256:web:db57bef57d1567fc05a885",
    measurementId: "G-NRJ9TRW84S"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

 const database = firebase.database();

 export {firebase, database as default};