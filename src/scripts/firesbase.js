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

const firebaseapp = initializeApp(firebaseConfig);
export const fireStore = getFirestore(firebaseapp);

export const cloudStorage = getStorage(firebaseapp);
export const authentication = getAuth(firebaseapp);
