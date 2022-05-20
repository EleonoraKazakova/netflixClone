import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2b6k89vCH_D6ImUenEpkCDVDaSq6lJlo",
  authDomain: "netflix-5761b.firebaseapp.com",
  projectId: "netflix-5761b",
  storageBucket: "netflix-5761b.appspot.com",
  messagingSenderId: "508637399299",
  appId: "1:508637399299:web:8200ef1f24f5a031ef8136",
};

/*const firebaseConfig = {
  apiKey: "AIzaSyDjof7ZquoN1Q5X3XNcMPSmsW2Hs8ay6LM",
  authDomain: "netflix-2063c.firebaseapp.com",
  projectId: "netflix-2063c",
  storageBucket: "netflix-2063c.appspot.com",
  messagingSenderId: "733618508223",
  appId: "1:733618508223:web:799817d6ee51dde2c2d10a",
};*/

const firebaseapp = initializeApp(firebaseConfig);
export const fireStore = getFirestore(firebaseapp);

export const cloudStorage = getStorage(firebaseapp);
export const authentication = getAuth(firebaseapp);
