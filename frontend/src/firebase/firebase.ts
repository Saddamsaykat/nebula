// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY, 
  authDomain: import.meta.env.VITE_Auth_Domain, 
  projectId: import.meta.env.VITE_Project_ID, 
  storageBucket: import.meta.env.VITE_Storage_Bucket, 
  messagingSenderId: import.meta.env.VITE_Messaging_Sender_Id, 
  appId: import.meta.env.VITE_APP_ID, 
  measurementId: import.meta.env.VITE_Measurement_Id, 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);