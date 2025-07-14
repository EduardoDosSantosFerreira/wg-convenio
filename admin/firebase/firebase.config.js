// firebase.config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { 
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAA2NSpIuMA-AnivA_g9crPSAU2iwRrqhQ",
  authDomain: "wgconvenios-92de2.firebaseapp.com",
  projectId: "wgconvenios-92de2",
  storageBucket: "wgconvenios-92de2.appspot.com",
  messagingSenderId: "742529038097",
  appId: "1:742529038097:web:7a21676e7a80d397c47eb0",
  measurementId: "G-6VHFCQLVN2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { 
  auth, db, storage,
  collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, onSnapshot, serverTimestamp,
  ref, uploadBytes, getDownloadURL,
  onAuthStateChanged, signOut
};