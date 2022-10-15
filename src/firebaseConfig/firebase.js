
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDxmbPuVIH_JFLSODLeznwrS-S5VDUX2uQ",
  authDomain: "crud-fire-reactjs.firebaseapp.com",
  projectId: "crud-fire-reactjs",
  storageBucket: "crud-fire-reactjs.appspot.com",
  messagingSenderId: "161293104926",
  appId: "1:161293104926:web:c519c6fe645bec6bb77b0f"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)