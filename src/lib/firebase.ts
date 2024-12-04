// lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Suas credenciais do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA7aBl1VCtYxIa1e0VoAOzP81UYGkvtwLU",
    authDomain: "popcorn-view.firebaseapp.com",
    projectId: "popcorn-view",
    storageBucket: "popcorn-view.firebasestorage.app",
    messagingSenderId: "206900432073",
    appId: "1:206900432073:web:581ff6a3cb7f9d4655d118",
    measurementId: "G-LTMWDZ669P"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Exportando os serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
