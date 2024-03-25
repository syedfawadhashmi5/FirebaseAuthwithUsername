import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyD4I5Fz63WiWXOFtDNVTv3yR7TsK-cV2dA",
    authDomain: "fir-auth-react-4686b.firebaseapp.com",
    projectId: "fir-auth-react-4686b",
    storageBucket: "fir-auth-react-4686b.appspot.com",
    messagingSenderId: "536384888209",
    appId: "1:536384888209:web:da2cf63d184df3771d4e30",
    measurementId: "G-S2CR8EPW4E"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {
    db,
    auth,
}