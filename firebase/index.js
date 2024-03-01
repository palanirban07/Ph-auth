import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDRPteD1-FAsn2d4pnRufTe5uXeav0b4Mc",
  authDomain: "todo-vue-4cedc.firebaseapp.com",
  projectId: "todo-vue-4cedc",
  storageBucket: "todo-vue-4cedc.appspot.com",
  messagingSenderId: "1082335413288",
  appId: "1:1082335413288:web:701ab388cefea39edb211d"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
auth.languageCode = 'it';


export { auth, db}