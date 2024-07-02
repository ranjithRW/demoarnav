import { initializeApp } from "firebase/app";
import { getFirestore} from "@firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyAwtYPLZVMjh9g-9uMEJLEs3fi_m062lx0",
  authDomain: "indoor-5cb76.firebaseapp.com",
  projectId: "indoor-5cb76",
  storageBucket: "indoor-5cb76.appspot.com",
  messagingSenderId: "163329292943",
  appId: "1:163329292943:web:04b5a9ae13be326135cefa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore=getFirestore(app);
export {firestore};