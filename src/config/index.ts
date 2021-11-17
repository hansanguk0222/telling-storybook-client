import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseSetting = firebase.initializeApp(
  {
    apiKey: process.env.REACT_APP_FU_DATABASE_API_KEY,
    authDomain: process.env.REACT_APP_FU_DATABASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FU_DATABASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FU_DATABASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FU_DATABASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FU_DATABASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FU_DATABASE_PRODUCTION_APP_ID,
  },
  "storybook"
);

export const firebaseClothesInfosRTDB = firebaseSetting.database();

export const firebaseClothesStorage = firebaseSetting.storage();
